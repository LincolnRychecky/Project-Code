//login

function check(form)
{
  if(form.userid.value == "myuserid" && form.pswrd.value == "mypswrd"){


    window.open('target.html')


  }
  else{
    alert("Error Password or Username")
  }
}



//Load and add Postings

// Saved postings
var storedCards = [{title: "TV", image: "assets/example1.jpg", description: "Used 32 in Plasma tv"},
                {title: "Guitar", image: "assets/example2.jpg", description: "Used Electric Guitar"},
                {title: "Skis", image: "assets/example3.jpg", description: "Used Skis"}];


function addPost(title, image, description)
{
  //Create card
  let card = document.createElement("div");
  card.className = 'card';
  card.style = "width: 18rem; text-align: center;"

  //Add card body
  let cardBody = document.createElement('div');
  card.appendChild(cardBody);
  cardBody.className = 'card-header';

  //Add image
  let picture = document.createElement('img');
  picture.style = 'height: 30% width: 30%';
  picture.className = 'card-img-top';
  picture.src = image;
  card.appendChild(picture);


  //Add title
  let cardTitle = document.createElement('h5');
  cardTitle.innerHTML = title;
  cardBody.appendChild(cardTitle);

  //Add description
  let desc = document.createElement('p');
  card.appendChild(desc);
  desc.innerText = description;
  cardBody.appendChild(desc);

  return card;
}

function loadPosts()
{
  var i;
  for (i = 0; i < storedCards.length; i++)
  {
    var newPost = addPost(storedCards[i].title, storedCards[i].image, storedCards[i].description);
    console.log(newPost);
    document.getElementById('postings').appendChild(newPost);
  }
}
