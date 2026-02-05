from .models import User, Video, Analysis
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        # extra_kwargs = {"password": {"write_only": True}}

    # def create(self, validated_data):
    #     print(validated_data)
    #     user = User.objects.create_user(**validated_data)
    #     return user

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'

class AnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analysis
        fields = '__all__'
