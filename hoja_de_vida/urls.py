from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('api/cv/', views.cv_api, name='cv_api'),
] + static('/assets/', document_root=settings.BASE_DIR / 'frontend' / 'dist' / 'assets')
