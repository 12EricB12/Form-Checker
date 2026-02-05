from django.db import models
# import video_analyzer

# Create your models here.
class User(models.Model):
    age = models.IntegerField()
    name = models.CharField()

    def __str__(self):
        return self.name

class Video(models.Model):
    user_id = models.CharField()
    video_data = models.FileField(upload_to="user_videos/")
    width = models.IntegerField(default=1080)
    height = models.IntegerField(default=1920)
    frames_cut_per_second = models.IntegerField(default=5)

    def __str__(self):
        return str(self.video_data)
    
class Analysis(models.Model):
    user_id = models.CharField()
    results = models.JSONField()
    analyzed_images = models.JSONField()

    def __str__(self):
        return self.name
