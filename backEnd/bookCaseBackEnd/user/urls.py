from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signUp_View, name='signup'),
    path('signin/', views.signIn_View, name='signin'),
    path('signout/', views.signOut_View, name='signout'),
]
