# Kantin Kejujuran

![Screenshot 2022-07-10 231707](https://user-images.githubusercontent.com/70869295/178153502-15ebc100-c522-4780-bf57-480c90a08b02.png)

## About the Project
Kantin Kejujuran is basically an online school canteen with honesty embraced in its operations. You can buy and sell items, and also store and withdraw money from the canteen's balance box (only after you register an account and log in).

## Built With
- React (as the frontend)
- Django (as the backend)

React will communicate with the database through Django. Django will serve as an API for the database. The default configuration of the database from Django is SQLite3.

## Prerequisites
To run this project, you need the latest versions of:
- npm
- python (we need the pip command)

## Getting Started
In order to fully configure the project, there are a few steps needed to be taken. (Note: I used a Windows to build this project, so the commands will be based on what I used on Windows)

- Cloning the repo

<pre>git clone git@github.com:gooseguy88/kantin-kejujuran-sea.git</pre>

- Setting up the backend
1. In the root directory (kantin-kejujuran-sea), go to the backend folder and create a virtual environment. This will make things cleaner. To do so, we will need to run these commands:

<pre>cd backend
pip install virtualenv
virtualenv env</pre>

Next, we need to activate the environment.

<pre>env\scripts\activate</pre>

There should be a `(env)` at the start of our terminal directory, which means we can use pip to only manipulate the virtual environment, making things cleaner.

2. Install Python dependencies

In the backend folder (which contains a backend folder), make sure you have the `(env)` showing up and run the following command:

<pre>pip install -r requirements.txt</pre>

The command will read through the `requirements.txt` file in the backend folder and install all the packages inside of it, and the installation directory will be inside the env folder.

3. Run the Django server

In the backend folder (which contains a backend folder), make sure you have the `(env)` showing up and run the following command:

<pre>python manage.py flush
yes
python manage.py runserver</pre>

Before running the server, to clean the database we need to use the flush command. The we use runserver command. This will then run the Django server and we will be able to access the API to communicate with the database.

We can also create a superuser to handle database tables from an admin panel (optional; see `See database tables` in `Usage`). To do this, we need to do the following:
<pre>python manage.py createsuperuser
... (the credentials)</pre>

That is all for the backend side. Now on to React!

- Setting up the frontend

This setup will be easier than the Django side.

1. Install React project dependencies

Open a new terminal in the root directory of the project (kantin-kejujuran-sea). Make sure not to close the terminal where we used the command `python manage.py runserver`. Next, run the following commands to install the React dependencies needed for this project:

<pre>cd frontend
npm install</pre>

2. Run the React app

In the frontend folder, run the following command:

<pre>npm start</pre>

And now the React app has started and we are done for the setup! We can then access Kantin Kejujuran and explore the features inside of it.

I apologize for the long process. I was planning to deploy the project but wasn't able to do so in time.

## Usage
It is required to make an account and log in to it before accessing all the features of Kantin Kejujuran. To do so, we can hit the `Log In` button at the navbar and click on `Daftar di sini.`
Next, we can add our details in the form, and register the account. Finally, we can log in and start our journey in the Kantin!

- Add items to Kantin

At first, there won't be any products for sale. So we need to add one. Click on `Mau jadi penjual pertama?` and fill in the details of the product. Congratulations, we have added our first product in the Kantin!

- Buy items in Kantin

We can also buy items in the Kantin. It might be better to not let a seller buy their own products, but I think there are some use cases for that, so buying products you sell is allowed. :) We can do this by clicking on a product card and clicking on `Beli`.  This brings is to another feature of the Kantin.

- Store money in Kotak Uang (canteen balance box)

After buying a product, we will be redirected to the Kotak Uang page. There, we can either store money to the "box" or withdraw from it. In this case, we should store the money. Click on `Setor` and input a valid amount of money to be stored.

- Withdraw money from Kotak Uang

If we are the seller, we can choose to withdraw money with the `Ambil` button. We can then input the amount of money we want to take.

When we are done exploring, we can log out by clicking the red `Log Out` button at the navbar.

- See database tables

With the superuser (if we have created one), we can access the database tables from `localhost:8000/admin` and then entering the superuser credentials.

## Issues Encountered
Still, the canteen has some areas that can be improved in the future, such as:
- Reenforcing the way sellers can withdraw, because in the meantime there is no way of notifying the sellers that their products have been bought.
- Making sure the frontend makes a request only once. If we inspect the browser and head to the Network panel, and then hit refresh, we will see that each request will be duplicated.
- Being able to type certain endpoints directly from the search bar. For instance, if we haven't logged in and type `localhost:3000/daftar` manually to the search bar, we will be redirected to a 404 page (this is only if we haven't logged in). But if we go ahead and click the Log In button at the navbar and click `Daftar di sini`, we will successfully go to the Register page.
- Being successful in passing user profile photo. My intention was to add a user photo attribute to the users, but I wasn't able to pass the data, so I passed on that feature.

## Contact
If there is anything unclear about the project, feel free to contact me through:
- LINE (aglib_)
- Instagram (@gibranoderenz)

## Acknowledgements
The animations I use are from lottiefiles.com. All other acknowledgements have been put in the comments of certain code snippets inside the source code.

## End Note
I would like to thank the Compfest SEA team for making this assignment, because I was pushed positively to learn new technologies. This build has been fun and I look forward to build more of these in the future. Any feedbacks will be accepted gladly.
