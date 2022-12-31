# Easy Learning

This is a main project of **CSEN 704 Advanced Computer Lab** course. The prime goal of the project is to create a complete Online Learning System. An Online Learning System is a web application through which individuals can attend pre-recorded courses online. Existing web applications include but are not limited to Coursera, Udemy, LinkedIn Learning, Great Learning and Udacity.

## Table of Contents
- [Purpose](#purpose)
- [Tools and Frameworks](#tools-and-frameworks)
- [Coding Style](#coding-style)
- [Installation](#installation)
- [Samples](#samples)
- [Features](#features)
- [API References](#api-references)

## Purpose

- Learn to research and master the use of the **MERN Stack**.
- Learn how to properly use the **Agile Methodology** to plan out a project and develop the software.
- Learn the process of following a given set of **System Requirements** to develop a software.
- Learn how to work together as a team on GitHub.


## Tools and Frameworks
![MERN Stack](https://user-images.githubusercontent.com/60584447/146457684-e9f0bb67-605f-48ae-908e-590405719e85.png)
This project is fully implemented using the **MERN Stack**. *MERN* stands for *MongoDB*, *Express*, *React*, *Node*, after the four key technologies that make up the stack.
- *MongoDB* is an open-source NoSQL database management program. NoSQL is used as an alternative to traditional relational databases. NoSQL databases are quite useful for working with large sets of distributed data. MongoDB is a tool that can manage document-oriented information, store or retrieve information.
- *Express* is a Node. js web application server framework, designed for building single-page, multi-page, and hybrid web applications. It is the de facto standard server framework for node.
- *ReactJS* is an open-source JavaScript library that is used for building user interfaces specifically for single-page applications. It's used for handling the view layer for web and mobile apps. React also allows us to create reusable UI components.
- *NodeJS* is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.

## Coding Style
This project is divided into two main parts, frontend and backend. Our backend is divide into routes that act as a middle point between the client and the database. On the other hand, the frontend focuses on the coding and creation of elements and features of our website that will then be seen by the user (the client-side).


## Installation
In order to run our project, you should have the following installed in your machine:
 - [Node JS](https://nodejs.org/en/)
 - [NPM](https://www.npmjs.com/)
 - [React JS](https://react-cn.github.io/react/downloads.html) or you can use `NPM`
 - And you can choose any text editor.
 - [MongoDB](https://docs.mongodb.com/manual/installation/) either locally or on a cloud. You have to create `.env` with the dbconnectionString.

## Samples
### Signing Up

### Applying for a Course


## Features

Mainly this website provides an easy way to apply and attend pre-recorded courses online. Also, allows admins to perform CRUD operations on courses in a flexible way. Moreover, our website allows user to pay in order to reserve in a course and after the completion of any course, users receive a certificate of completion.


## API References
Our backend is divided into different routes either general for all users or specific, based on the type of the user. Each route has a set of *APIs* with different functionalities.

### General
1. ***SignUp***
- Route `/signUp`
- Request Type `POST`
- Request Body 
```
{

fName: "Mariam"
lName: "Tamer"
gender: "Female"
username: "mariam237"
email: "mariamtamer237@gmail.com"
password: "Mariam123!"

}

```
- Response Body
```
{   
    success: false,
    message: "You couldn't sign-up. Error : ", 
    err
}
OR
{   
    success:  true,
    message: "You have Signed-Up Successfully!"
}
```

2. ***Login***
- Route `/login`
- Request Type `POST`
- Request Body 

```
{

email: "mariamtamer237@gmail.com"
password: "Mariam123!"

}

```
- Response Body
```
{   
    success: false,
    message: "Email or Password is incorrect."
}
OR
{   
    success:  true,
    message: "Login Successful!"
}
```
- Note: A token is created and user's id is saved in the webiste's cookies.

3. ***Add Company***
- Add a company into our system (done by main administrator)
- Route `/addCompany`
- Request Type `POST`
- Request Body 
```
{
   name: "GUC"
}
```
- Response Body
```
{   
    success: false,
    message: error.message
}
OR
{   
    success:  true,
    message: "Added Successfully!"
}
```
4. ***Update Company***
- Add a course to the company's courses in our system (done by main administrator)
- Route `/updateCompany/:id`
- Parameters: `id`
- Request Type `PATCH`
- Request Body 
```
{
  courseTitle: "Computer Science",
  expiryDate: "09/2023",
  level: "3"
}
```
- Response Body
```
{   
    success: false,
    message: error.message
}
OR
{   
    success:  true,
    message: "Updated Successfully!"
}
```

### Admin
1. ***
