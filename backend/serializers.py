from rest_framework import serializers

from backend.models import ground, bookings

class groundSerializers(serializers.ModelSerializer):
    class Meta:
        model = ground
        fields = '__all__'


class bookingsSerializers(serializers.ModelSerializer):
    ground = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    class Meta:
        model = bookings
        fields = '__all__'
    
    def get_ground(self, instance):
        return instance.ground.name
    
    def get_user(self, instance):
        return instance.user.username



class custombookingsSerializers(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    ground = serializers.SerializerMethodField()
    class Meta:
        model = bookings
        fields = '__all__'
    

    def get_user(self, instance):
        return instance.user.username
    
    def get_ground(self, instance):
        return "{}, Address - {}".format(instance.ground.name, instance.ground.address)