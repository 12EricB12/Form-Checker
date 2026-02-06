from django.urls import path
from .views import get_users, create_user, get_videos, get_analysis, create_video

urlpatterns = [
    path('users/get', get_users, name='get_users'),
    path('users/create', create_user, name='create_user'),
    path('videos/get', get_videos, name='get_videos'), 
    path('videos/create', create_video, name='create_video'),
    path('analysis/get', get_analysis, name='get_analysis')
]

