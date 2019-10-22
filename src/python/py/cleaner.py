import json

cleaned_geojson = {
    "type": "FeatureCollection",
    "name": "tracts",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": []
}

with open('../data/tracts.geojson') as tracts_json:
    data = json.load(tracts_json)
    tracts = data['features']

    for tract in tracts:
        print(tract)

        cleaned_tract = {}
        cleaned_tract["type"] = "Feature"
        cleaned_tract["properties"] = {}
        cleaned_tract["properties"]["id"] = tract["properties"]["id"]
        cleaned_tract["properties"]["place2010"] = tract["properties"]["place2010"]
        cleaned_tract["properties"]["tract2010"] = tract["properties"]["tract2010"]


        # get pop numbers
        if tract["properties"]["pop_HC01_VC03"] != None:
             cleaned_tract["properties"]["pop"] = tract["properties"]["pop_HC01_VC03"]

        if tract["properties"]["collin_pop_HC01_VC03"] != None:
             cleaned_tract["properties"]["pop"] = tract["properties"]["collin_pop_HC01_VC03"]

        if tract["properties"]["denton_pop_HC01_VC03"] != None:
             cleaned_tract["properties"]["pop"] = tract["properties"]["denton_pop_HC01_VC03"]

        if tract["properties"]["rockwall_pop_HC01_VC03"] != None:
             cleaned_tract["properties"]["pop"] = tract["properties"]["rockwall_pop_HC01_VC03"]


        # get income numbers
        if tract["properties"]["income_HC01_EST_VC13"] != None:
             cleaned_tract["properties"]["income"] = tract["properties"]["income_HC01_EST_VC13"]

        if tract["properties"]["collin_income_HC01_EST_VC13"] != None:
             cleaned_tract["properties"]["income"] = tract["properties"]["collin_income_HC01_EST_VC13"]

        if tract["properties"]["denton_income_HC01_EST_VC13"] != None:
             cleaned_tract["properties"]["income"] = tract["properties"]["denton_income_HC01_EST_VC13"]

        if tract["properties"]["rockwall_income_HC01_EST_VC13"] != None:
             cleaned_tract["properties"]["income"] = tract["properties"]["rockwall_income_HC01_EST_VC13"]


        # get poverty numbers
        if tract["properties"]["pov_HC03_EST_VC01"] != None:
             cleaned_tract["properties"]["pov"] = tract["properties"]["pov_HC03_EST_VC01"]

        if tract["properties"]["collin_pov_HC03_EST_VC01"] != None:
             cleaned_tract["properties"]["pov"] = tract["properties"]["collin_pov_HC03_EST_VC01"]

        if tract["properties"]["denton_pov_HC03_EST_VC01"] != None:
             cleaned_tract["properties"]["pov"] = tract["properties"]["denton_pov_HC03_EST_VC01"]

        if tract["properties"]["rockwall_pov_HC03_EST_VC01"] != None:
             cleaned_tract["properties"]["pov"] = tract["properties"]["rockwall_pov_HC03_EST_VC01"]


        # get race numbers
        if tract["properties"]["race_HD01_VD03"] != None:
             cleaned_tract["properties"]["white"] = tract["properties"]["race_HD01_VD03"]

        if tract["properties"]["collin_race_HD01_VD03"] != None:
             cleaned_tract["properties"]["white"] = tract["properties"]["collin_race_HD01_VD03"]

        if tract["properties"]["denton_race_HD01_VD03"] != None:
             cleaned_tract["properties"]["white"] = tract["properties"]["denton_race_HD01_VD03"]

        if tract["properties"]["rockwall_race_HD01_VD03"] != None:
             cleaned_tract["properties"]["white"] = tract["properties"]["rockwall_race_HD01_VD03"]




        cleaned_tract["geometry"] = {}
        cleaned_tract["geometry"]["type"] = tract["geometry"]["type"]
        cleaned_tract["geometry"]["coordinates"] = tract["geometry"]["coordinates"]

        print(cleaned_tract)

        cleaned_geojson["features"].append(cleaned_tract)


with open('../data/cleaned_tracts.geojson', 'w') as outfile:
    json.dump(cleaned_geojson, outfile)
