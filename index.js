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

var postings = [];

function addPost(var title, var image, var description)
{
  let card = document.createElement("div");
  card.className = 'posting';

  let cardBody = document.createElement('div');
  cardBody.className = description;

  let description = document.createElement('p');
  description.innerText = task.description;
  description.className = 'posting-description';

  postings.push(card);
  console.log(postings);
  return card;
}

function loadPosts()
{
  var i;
  for (i = 0; i < storedCards.length; i++) {
    var newPost = addPost(players[i].title, players[i].image, players[i].description);
    document.body.appendChild(newPost);
  }
}
