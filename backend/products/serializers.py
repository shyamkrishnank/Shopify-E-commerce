from rest_framework.serializers import ModelSerializer
from .models import SportsCategory


class SportsCategorySerializer(ModelSerializer):
    class Meta:
        model = SportsCategory
        fields = '__all__'
