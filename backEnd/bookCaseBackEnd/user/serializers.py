from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('id','email', 'username', 'password', 'confirm_password')

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not natch")
        return data    

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(
            email = validated_data['email'],
            username = validated_data['username'],
            password = validated_data['password'] 
        )

        return user