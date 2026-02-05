import os
import cv2
import subprocess
import math
import keras # type: ignore

class ModelDriver:
    def __init__(self, video_path):
        processed_path = os.path.join(os.path.dirname(video_path), fr"./image_{os.path.basename(video_path).strip('.mp4')}")

    def split_video(self, video_path, num_frames=10):
        if not video_path.endswith('.mp4'):
            return

        cap = cv2.VideoCapture(video_path)

        vid_length = self.get_length(video_path)
        if vid_length == 0:
            return

        frame_rate = int(num_frames/vid_length)
        if frame_rate == 0:
            return
        frame_count = 0

        while cap.isOpened():
            success, frame = cap.read()

            if not success:
                break
            if frame_count % math.floor(frame_rate) == 0:
                file_name = self.processed_path

                if not os.path.exists(file_name):
                    os.makedirs(file_name)

                if os.path.exists(os.path.join(file_name, f"{frame_count}.jpg")):
                    print(f"Skipping {frame_count}.jpg in {os.path.basename(file_name)}")
                    frame_count += 1
                    continue

                cv2.imwrite(os.path.join(file_name, f"{frame_count}.jpg"), frame)

            frame_count += 1

        cap.release()
        print(f"{os.path.basename(video_path)} successfully saved")

    def get_length(self, file):
        result = subprocess.run(["ffprobe", "-v", "error", "-show_entries",
                                "format=duration", "-of",
                                "default=noprint_wrappers=1:nokey=1", file],
                                stdout=subprocess.PIPE,
                                stderr=subprocess.STDOUT)
        return float(result.stdout)

    def get_prediction(self):
        model = keras.models.load_model(
        r'../model/models/comp_processed.keras',
        custom_objects={
            "Conv2Plus1D": Conv2Plus1D, # type: ignore
            "ResidualMain": ResidualMain, # type: ignore
            "Project": Project, # type: ignore
            "ResizeVideo": ResizeVideo # type: ignore
        })
        model.predict(self.processed_path)
