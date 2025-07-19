# Web Dashboard for Doctors and Patients

## Project Abstract

This project aims to develop a secure web-based dashboard where patients can input and manage their medical data, and doctors can visualize this information clearly and interactively to support ongoing care and decision-making.

## Background and Motivation

In many healthcare systems today, there is a lack of seamless digital communication between patients and healthcare providers. Patients often store their medical information across scattered documents or apps, while doctors have limited access to consistent, longitudinal health data outside of appointments. This fragmentation makes it difficult to track trends, detect risks early, or personalize treatment plans.

This project proposes building a web-based dashboard where:

- **Patients** can log in to a private, secure account and upload or manually input health data (e.g., blood pressure, weight, glucose levels, symptoms, notes).
- **Doctors** can access a dashboard view of their assigned patients with time-series visualizations, anomaly alerts, and downloadable reports.

The platform will promote self-management for patients and provide doctors with better insights into patient progress between visits. Previous efforts in this space often lacked real interactivity, scalability, or privacy control. Our solution aims to cover all these aspects using modern web development practices and cloud-based infrastructure.

## Technology Used

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [OpenEHR](https://openehr.org/)
- [EHRbase](https://www.ehrbase.org/)
- [Template Designer](https://oceanhealthsystems.com/software/template-designer)
- [Archetype Editor](https://oceanhealthsystems.com/software/archetype-editor)

# EHRBase Setup

This section of the documentation will walk you through on how to set up a local instance of EHRBase to use in conjunction with this web application. This how-to guide primarily uses bash commands. 

## Step 0: Set Up
This tutorial requires the use of [Docker](https://www.docker.com/products/docker-desktop/) and [Template Designer](https://oceanhealthsystems.com/software/template-designer). A profile with (CaboLabs' openEHR toolkit)[https://toolkit.cabolabs.com/] is also required.

While not required, you can use [Archetype Editor](https://oceanhealthsystems.com/software/archetype-editor) to edit ADL files from openEHR's Clinical Knowledge Manager.

It's recommended to use [Swagger UI](https://swagger.io/tools/swagger-ui/) in order to see how to interact with EHRBase's REST API. The appropriate link will look something like ```http://localhost:8080/ehrbase/swagger-ui/index.html#/```


## Step 1: Start PostgresDB and EHRBase

Spin up a preconfigured EHRBase postgres database by running the following command in Docker's terminal:

```
`docker run --network ehrbase-net --name ehrbase-postgres \
-e POSTGRES_USER=postgres \
-e PASSWORD=postgres \
-e EHRBASE_USER=ehrbase_restricted \
-e EHRBASE_PASSWORD=ehrbase_restricted \
-e EHRBASE_USER_ADMIN=ehrbase \
-e EHRBASE_PASSWORD_ADMIN=ehrbase \
-d -p 5432:5432 \
ehrbase/ehrbase-v2-postgres:16.2
```

Start a local instance of EHRBase by running the following command in Docker's terminal:
```
docker run --network ehrbase-net --name ehrbase \
-e DB_URL=jdbc:postgresql://ehrbase-postgres:5432/ehrbase \
-e DB_USER=ehrbase_restricted \
-e DB_PASS=ehrbase_restricted \
-e DB_USER_ADMIN=ehrbase \
-e DB_PASS_ADMIN=ehrbase \
-e SERVER_NODENAME=local.ehrbase.org \
-e SPRING_PROFILES_ACTIVE=local \
-d -p 8080:8080 \
ehrbase/ehrbase
```

## Step 2: Prepare a Template
Use openEHR's [Clinical Knowledge Manager (CKM)](https://ckm.openehr.org/ckm/) to obtain an information model. Once an informational model has been selected, download its ADL file.

Open the Template Designer. Go to "Tools" -> "Knowledge Repository" -> "Edit Repository List."
![Template Designer screenshot](https://github.com/user-attachments/assets/fc5957de-a96e-447a-ba63-78a5b6b65917)

Set the paths to "Archetype Files," "Working Archetype Files," and "Template Files" to the path where your ADL file is stored. If done properly, you should see archetypes appear on the right.
![Archetype window](https://github.com/user-attachments/assets/96fe91a7-5338-46df-a467-62117906dbb8)

Now you can create a template. Simply drag and drop your archetype from the right window into the left one. If desired, fill any open slots with more archetypes. Note that templates need an archetype of type _Composition_ as the root element.

Give your template a name and export it as an operational template (.opt).
![Export as OPT](https://github.com/user-attachments/assets/26c232b5-a020-4dd4-afe8-f514f80b4868)

## Step 3: Upload Your Template
Run the following bash command to upload your template into EHRBase:
```
curl -X POST http://localhost:8080/ehrbase/rest/openehr/v1/definition/template/adl1.4   -H "Content-Type: application/xml"   --data-binary @YOUR-TEMPLATE-NAME.opt
```

You can check if your template was loaded by running the following bash command:
```
curl -X GET http://localhost:8080/ehrbase/rest/openehr/v1/definition/template/adl1.4
```

This command will also return your template's ID. **Make sure to note this down!**

## Step 4: Create an EHR
Run the following bash command to create an electronic health record:
```
curl -v -X POST http://localhost:8080/ehrbase/rest/openehr/v1/ehr
```

**This will return an ID for your EHR. Please note this down!**

You can check if your EHR was properly created by running the following command:
```
curl -X GET http://localhost:8080/ehrbase/rest/openehr/v1/ehr/YOUR EHR ID
```

## Step 5: Prepare a Composition
Go to CaboLabs' openEHR toolkit and upload your template. Once uploaded, click on it. This will take you to a page of tools you can use with your template. 

![Template tools](https://github.com/user-attachments/assets/e86536fe-5dcf-4015-88aa-b7550358fb2f)

Select "Canonical Instance Generator" and click "Generate" to generate a composition for your template. Save this JSON file to the same file path as your template.

Run the following bash command:
```
curl -X POST "http://localhost:8080/ehrbase/rest/openehr/v1/ehr/YOUR EHR ID/composition" -H "Content-Type: application/json" -d @YOUR COMPOSITION.json
```

Congratulations! You have everything you need to use EHRBase :)

# Archetypes and Templates Used
## Archetypes
- **openEHR-EHR-CLUSTER.symptom_info.v1** - records name, intensity, date, and time of an episode of a reported symptom
- **openEHR-EHR-COMPOSITION.self_reported_data.v1** - a generic container for information provided by a patient

## Templates
- **Self_reported_symptoms** - combines the openEHR-EHR-COMPOSITION.self_reported_data.v1 (root) and openEHR-EHR-CLUSTER.symptom_info.v1

# Frontend Documentation

## Typography

- Serif: Scheherazade New
- Sans Serif: Inter

## Color Scheme

- Black: #363636
- Gray: #A0A0A0cd
- Light gray: #F0EFEB
- Red: #FE322F
- Yellow: #FFC51E
- Orange: #FBA147
- Green: #93C572
- Blue: #A4DAD2
