var firebaseConfig = {
    apiKey: "AIzaSyDXl0CyH6CsOsG_3YmnYiVBrddZMA4RuJQ",
    authDomain: "buff-list.firebaseapp.com",
    databaseURL: "https://buff-list.firebaseio.com",
    projectId: "buff-list",
    storageBucket: "buff-list.appspot.com",
    messagingSenderId: "562024677329",
    appId: "1:562024677329:web:5fc43b133b42263a38aaf0",
    measurementId: "G-0LYL9PHLCC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get a reference to the database
var database = firebase.firestore();

// Create a storage reference from our database
var docRef = database.collection("Tester");

//create instance of the Google provider instance
var provider = new firebase.auth.GoogleAuthProvider();

//user status div
var user_info = document.getElementById("user_status");

//current user
var current_user = null;


// function authenticate(){
//   firebase.auth().signInWithPopup(provider).then(function(result) {
//     if (result.credential) {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       var token = result.credential.accessToken;
//     }
//     else {
//       //google sign-in redirect
//       firebase.auth().signInWithPopup(provider);
//     }
//     // The signed-in user info
//     current_user = result.user;
//     // Hide sign in
//     document.getElementById("signin").style.visibility = "hidden";
//     document.getElementById("signout").style.visibility = "visible";
//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     console.log("Sign in error");
//   });
// }
//
// function signOut(){
//   firebase.auth().signOut().then(function() {
//     // Sign-out successful
//     current_user = null;
//     user_info.innerHTML = "";
//     document.getElementById("signin").style.visibility = "visible";
//     document.getElementById("signout").style.visibility = "hidden";
//   }).catch(function(error) {
//     // An error happened
//     console.log("Sign out error");
//   });
// }
//
// //setting an event listener for change of authentication state
// firebase.auth().onAuthStateChanged(function(user) {
//   current_user=user;
//   if (user) {
//       // User is signed in
//     user_info.innerHTML = "Welcome, " + user.displayName;
//     } else {
//       // No user is signed in
//     user_info.innerHTML = "";
//     }
// });

// document.getElementById("signin").addEventListener("click", authenticate);
// document.getElementById("signout").addEventListener("click", signOut);

// //Login to Buff List
// function check(form)
// {
//   for(var i = 0; i < users.length; i++){
//     //if the pair is located in the users and passwords arrays
//     if(form.userid.value == users[i] && form.pswrd.value == passwords[i]){
//       currentUser = users[i];
//       alert("Hello, " + currentUser + " welcome back to Buff List.")
//       return
//     }
//   }
//     alert("Either your username or password is incorrect")
//     return
// }
// //Log off of Buff List
// function logOff(){
// currentUser = "Not Logged in";
// return

// }
// //Create an Account
// function createAccount(){

// }


//Add post function
function addPosting(title, image, description, price, information)
{

  //ADD DROPDOWNMENU WITH CONTACT INFORMATION OF USER WHO POSTED ITEM

  //Create card
  let card = document.createElement("div");
  card.className = 'card';
  card.class = 'collapse';

  //Add card body
  let cardBody = document.createElement('div');
  card.appendChild(cardBody);
  cardBody.className = 'card-header';

  //Add image
  let picture = document.createElement('img');
  let anchor = document.createElement('a');
  anchor.href = image;
  anchor.target = 'popup'
  anchor.class = 'expandImage'
  anchor.setAttribute('onclick', "window.open(" + image + ",'popup','width=600,height=600'); return false;");
  card.appendChild(anchor);
  picture.style = 'height: 25rem; object-fit: cover;'
  picture.className = 'card-img-top';
  picture.src = image;
  anchor.appendChild(picture);

  //Add title and price
  let cardTitle = document.createElement('h5');
  cardTitle.innerHTML = title + ": $" + price;
  cardBody.appendChild(cardTitle);

  //Add description
  let desc = document.createElement('p');
  card.appendChild(desc);
  desc.innerText = description;
  cardBody.appendChild(desc);

  //Add user contact info
  // <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
  //   Button with data-target
  // </button>
  let info = document.createElement('p');
  card.appendChild(info);
  info.innerText = information;
  cardBody.appendChild(info);

  return card;
}

//load posts. Called once page is loaded
function loadPosts()
{
  //Each posting will be a document in the database
  //Steps:
  //get all document names into array.
  //iterate through array of document names, and get title, description, price, and image

  database.collection("Tester").get().then(function(querySnapshot)
  {querySnapshot.forEach(function(doc){
    if(doc.exists)
    {
      console.log("Document data:", doc.data());
      var post = doc.data();
      var title = post.title;
      var description = post.description;
      var price = post.price;
      var image = post.image;
      var info = post.contact;
      var testPost = addPosting(title, image, description, price, info);
      document.getElementById('postings').appendChild(testPost);
    }

    });
  });

}

function submitClick(){
    database.collection("Tester").add({
        contact: "Lincoln@gmail.com",
        description: "Guitar",
        image: "https://firebasestorage.googleapis.com/v0/b/buff-list.appspot.com/o/example2.jpg?alt=media&token=61be939f-ac57-410b-bf11-a887820bf442",
        price: 100,
        title: "Blue Guitar"
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}


// Firestore Query for Search
function search(num){
  var data = database.collection("Tester");
  if(num == 0){//Sports

    //var query = data.where("title", "==", "Red Guitar");
    database.collection('Tester').where("tag", "==", "Sports")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    console.log("Sports");
  }else if(num == 1){//Electronics
    console.log("Electronics");
    database.collection('Tester').where("tag", "==", "Electronics")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }else if(num == 2){//Instruments
    console.log("Instruments");
    database.collection('Tester').where("tag", "==", "Instruments")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  }else if(num == 3){//Furniture
    console.log("Furniture");
    database.collection('Tester').where("tag", "==", "Furniture")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }else if (num == 4){//Other
    console.log("Other");
    database.collection('Tester').where("tag", "==", "Other")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

}
