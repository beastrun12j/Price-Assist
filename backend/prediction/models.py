from django.db import models
import pandas as pd
import numpy as np
from joblib import load

 
# Create your models here.
class Prediction(models.Model):
    carModel = models.CharField(max_length=100)
    distanceTravelled = models.IntegerField(default=0)
    engineSize = models.IntegerField(default=0)
    fuelType = models.CharField(max_length=100)
    maxPower = models.IntegerField(default=0)
    mileage = models.IntegerField(default=0)
    seatType = models.IntegerField(default=0)
    sellerType = models.CharField(max_length=100)
    transmissionType = models.CharField(max_length=100)
    vehicleAge = models.IntegerField(default=0)
    prediction = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        model = load('prediction/models/model.joblib')
        carType = {'Audi A6': 0, 'Audi A8': 0, 'Audi Q7': 0, 'BMW 3': 0, 'BMW 5': 0, 'BMW 6': 0, 'BMW 7': 0, 'BMW X1': 0, 'BMW X3': 0, 'BMW X4': 0, 'BMW X5': 0, 'BMW Z4': 0, 'Datsun GO': 0, 'Datsun RediGO': 0, 'Datsun redi-GO': 0, 'Force Gurkha': 0, 'Ford Aspire': 0, 'Ford Ecosport': 0, 'Ford Endeavour': 0, 'Ford Figo': 0, 'Ford Freestyle': 0, 'Honda Amaze': 0, 'Honda CR': 0, 'Honda CR-V': 0, 'Honda City': 0, 'Honda Civic': 0, 'Honda Jazz': 0, 'Honda WR-V': 0, 'Hyundai Aura': 0, 'Hyundai Creta': 0, 'Hyundai Elantra': 0, 'Hyundai Grand': 0, 'Hyundai Santro': 0, 'Hyundai Tucson': 0, 'Hyundai Venue': 0, 'Hyundai Verna': 0, 'Hyundai i10': 0, 'Hyundai i20': 0, 'ISUZU MUX': 0, 'Isuzu D-Max': 0, 'Isuzu MUX': 0, 'Jaguar F-PACE': 0, 'Jaguar XE': 0, 'Jaguar XF': 0, 'Jeep Compass': 0, 'Jeep Wrangler': 0, 'Kia Carnival': 0, 'Kia Seltos': 0, 'Land Rover Rover': 0, 'Lexus ES': 0, 'Lexus NX': 0, 'Lexus RX': 0, 'MG Hector': 0, 'Mahindra Alturas': 0, 'Mahindra Bolero': 0, 'Mahindra KUV': 0, 'Mahindra KUV100': 0, 'Mahindra Marazzo': 0, 'Mahindra Scorpio': 0, 'Mahindra Thar': 0, 'Mahindra XUV300': 0, 'Mahindra XUV500': 0, 'Maruti Alto': 0,
                   'Maruti Baleno': 0, 'Maruti Celerio': 0, 'Maruti Ciaz': 0, 'Maruti Dzire LXI': 0, 'Maruti Dzire VXI': 0, 'Maruti Dzire ZXI': 0, 'Maruti Eeco': 0, 'Maruti Ertiga': 0, 'Maruti Ignis': 0, 'Maruti S-Presso': 0, 'Maruti Swift': 0, 'Maruti Swift Dzire': 0, 'Maruti Vitara': 0, 'Maruti Wagon R': 0, 'Maruti XL6': 0, 'Maserati Ghibli': 0, 'Maserati Quattroporte': 0, 'Mercedes-AMG C': 0, 'Mercedes-Benz C-Class': 0, 'Mercedes-Benz CLS': 0, 'Mercedes-Benz E-Class': 0, 'Mercedes-Benz GL-Class': 0, 'Mercedes-Benz GLS': 0, 'Mercedes-Benz S-Class': 0, 'Mini Cooper': 0, 'Nissan Kicks': 0, 'Nissan X-Trail': 0, 'Porsche Cayenne': 0, 'Porsche Macan': 0, 'Porsche Panamera': 0, 'Renault Duster': 0, 'Renault KWID': 0, 'Renault Triber': 0, 'Skoda Octavia': 0, 'Skoda Rapid': 0, 'Skoda Superb': 0, 'Tata Altroz': 0, 'Tata Harrier': 0, 'Tata Hexa': 0, 'Tata Nexon': 0, 'Tata Safari': 0, 'Tata Tiago': 0, 'Tata Tigor': 0, 'Toyota Camry': 0, 'Toyota Fortuner': 0, 'Toyota Glanza': 0, 'Toyota Innova': 0, 'Toyota Yaris': 0, 'Volkswagen Polo': 0, 'Volkswagen Vento': 0, 'Volvo S90': 0, 'Volvo XC': 0, 'Volvo XC60': 0, 'Volvo XC90': 0}
        transmission_type = {'Manual': 0}
        seller_type = {'Individual': 0, 'Trustmark Dealer': 0}
        fuel_type = {'Diesel': 0, 'Electric': 0, 'LPG': 0, 'Petrol': 0}

        vehicle_age = self.vehicleAge
        km_driven = self.distanceTravelled

        mileage = self.mileage
        engine = self.engineSize
        max_power = self.maxPower
        seats = self.seatType

        if self.carModel != "Audi A4":
            carType[self.carModel] = 1

        if self.fuelType != "CNG":
            fuel_type[self.fuelType] = 1

        if self.sellerType != "Dealer":
            seller_type[self.sellerType] = 1

        if self.transmissionType != "Automatic":
            transmission_type[self.transmissionType] = 1

        data1 = [vehicle_age, km_driven, mileage, engine, max_power, seats]
        data2 = [seller_type[i] for i in seller_type]
        data3 = [fuel_type[i] for i in fuel_type]
        data4 = [transmission_type[i] for i in transmission_type]
        data5 = [carType[i] for i in carType]

        minmax=pd.read_csv("prediction/MINMAXcost.csv")
        # min=np.mean(minmax.loc[minmax['car'] == self.carModel, 'min_cost_price'])
        # max=np.mean(minmax.loc[minmax['car'] == self.carModel, 'max_cost_price'])
        min=sorted(minmax.loc[minmax['car'] == self.carModel, 'min_cost_price'])[0]
        max=sorted(minmax.loc[minmax['car'] == self.carModel, 'max_cost_price'])[0]

        finallist = [min, max]+data1+data2+data3+data4+data5
        finallist = np.array(finallist)

        df = pd.DataFrame(finallist).T
        predictions = model.predict(df)
        self.prediction = predictions

        super().save(*args, **kwargs)
