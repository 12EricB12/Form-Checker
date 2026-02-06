from django.shortcuts import render
from .models import User, Video, Analysis
from rest_framework import generics
from .serializers import UserSerializer, VideoSerializer, AnalysisSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .model_libraries import video_analyzer

import os
import base64

# class CreateUserView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [AllowAny]

# USER REQUESTS
@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# VIDEO REQUESTS
@api_view(['GET'])
def get_videos(request):
    videos = Video.objects.all()
    serializer = VideoSerializer(videos, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def create_video(request):
    serializer = VideoSerializer(data=request.data)
    print("CREATING")
    if serializer.is_valid():
        print("AAAA")
        video_file = serializer.save()
        print(video_file)
        width = serializer.data.get('width')
        height = serializer.data.get('height')
        user_id = str(serializer.data.get('user_id'))
        frames = serializer.data.get('frames_cut_per_second')
        video_name = video_file.video_data.path 

        # Delete old video if it is in the database
        Video.objects.filter(user_id=user_id).delete()
        Analysis.objects.filter(user_id=user_id).delete()

        # Run analysis
        results = {}
        encodedPhotos = {}

        videoAnalyzer = video_analyzer.VideoAnalyzer(video_name, frames, width, height)
        videoAnalyzer.split_frames()
        key_frames = videoAnalyzer.find_key_time("squat")
        # analyzed_images_path and results should be in the same analysis order
        for i, frame in enumerate(key_frames):
            results[i] = videoAnalyzer.analyze_bottom_position(fr"{os.path.join(videoAnalyzer.sequence_path, frame)}", "squat")
        
        analyzedImages = videoAnalyzer.analyzed_images_path
        for i, image in enumerate(analyzedImages):
            with open(image, "rb") as image_file:
                image_data = image_file.read()
                base64_string = base64.b64encode(image_data).decode()
                encodedPhotos[i] = base64_string

        analysis_entry = Analysis(user_id=user_id, results=results, analyzed_images=encodedPhotos)
        analysis_entry.save()
        return Response(status=status.HTTP_201_CREATED)
    else:
        print("ERROR")
        print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_analysis(request):
    user_id = request.query_params.get('user_id')

    if not user_id:
        return Response({"error": "User ID missing"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        analysis_entry = Analysis.objects.filter(user_id=user_id).first()
        if not analysis_entry:
            return Response({"error": "Analysis not found or already deleted"}, status=status.HTTP_404_NOT_FOUND)

        # 3. Serialize the data into Python memory
        serializer = AnalysisSerializer(analysis_entry)
        data_to_return = serializer.data

        # 4. Wipe the Database Record
        analysis_entry.delete()
        return Response(data_to_return)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    # request_id = request.data.get("user_id")
    # with open('output.txt', 'wb') as f:
    #     f.writelines(request_id)

    # if not request_id:
    #     return Response("User ID missing", status=status.HTTP_400_BAD_REQUEST)
    # return Response("Unknown error", status=status.HTTP_400_BAD_REQUEST)
