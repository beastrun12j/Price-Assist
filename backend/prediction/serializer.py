from rest_framework import serializers
from .models import *


class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction
        fields = ['carModel', 'distanceTravelled', 'engineSize', 'fuelType', 'maxPower',
                  'mileage', 'seatType', 'sellerType', 'transmissionType', 'vehicleAge']
