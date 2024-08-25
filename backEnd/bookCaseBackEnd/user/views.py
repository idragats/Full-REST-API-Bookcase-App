from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.contrib.auth.models import User
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model, authenticate
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

@api_view(["POST"])
def signUp_View(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save() 
        token, created = Token.objects.get_or_create(user=user) 

        # Prepare the response data
        data = {
            "user": serializer.data,
            "token": token.key
        }

        return Response(data, status=status.HTTP_201_CREATED)  

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def signIn_View(request):
    data = request.data
    authenticate_user = authenticate(email=data['email'], password=data['password'])

    if authenticate_user is not None:
        user = User.objects.get(email=data['email'])
        serializer = UserSerializer(user)

        response_data = {
            'user': serializer.data,
        }

        token, created_token = Token.objects.get_or_create(user=user)

        if token:
            response_data['token'] = token.key
        elif created_token:
            response_data['token'] = created_token.key    

        return Response(response_data)    


    return Response({"detail" : "user not found"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def signOut_View(request):

    request.user.auth_token.delete()

    return Response({"message" : "sign out was successful" })

