# Listy - your shopping buddy

Create shopping lists in a fun and easy way by scanning the barcode of the product!

A simple yet effective shopping list app built in React Native using the (extremely limited in free requests :joy: ) Barcode Lookup API.


### :star: How does it work?

Simply create a list with a desired title, and start scanning your products. In case there is no barcode to scan (fruits, veggies...) you can simply input the products manually.
Listy saves you the trouble of creating lists over and over again - why don't you create a list of your favorite/most frequently bought items and update it as you go!

You just finished the milk from the fridge? :anguished: It is possible that you will forget to buy it when you are out and about :confused:. WAIT! Scan the barcode before throwing the milk out and never forget it again :stuck_out_tongue_winking_eye:.

![Listy - your shopping buddy](demo/listy-demo.gif)


### :star: How to get it up and running?

:exclamation: To run Listy on your computer/simulator you need to have [Android Studio and SDK Tools](https://developer.android.com/studio) installed, configured and ready to run.

:exclamation: Also, get your API key at the Barcode Lookup website and store it in your `.env ` that you will create at the root of the project.

Clone this repository and in the root folder install the dependencies to set up your environment: `npm install` or `yarn install`.

Then run `npm start` or even better `npm start -- --reset-cache`.  
Voilà! :rocket:


### :star: Observations

:muscle: Improvements (I've learned a lot since :relaxed:)
- there is some prop drilling so i would definitely use a state management library (Redux :purple_heart:)
- styles in React Native can get very repetititve - create modular styles
- refactor hooks to be cleaner 
- create a helper file so the functions don't crowd the components
- improve styling?

:fire: Back to the future    
- create users and have multiple profiles connected to the same account so a family/roomates can share the lists (like Netflix allows you to do) :heart_eyes_cat:
- show more info on every product that is in the list (ex. an image on press)
- add the quantity for items on the list
- make suggested lists for omnivors, vegans, vegetarians, seasonal lists and pantry essentials
- migrate from Local Storage to database -> create a server with a database


### :star: Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


### :star: License

[MIT](https://choosealicense.com/licenses/mit/)
