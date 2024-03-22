const express = require('express');

const app = express();

const items = [
  {
    petId: 1,
    imageUrl:
      'https://vignette.wikia.nocookie.net/yugioh/images/f/f1/SummonedSkull-SYE-EN-C-UE.png/revision/latest/scale-to-width-down/335?cb=20130804044723',
    description: 'sample monster effect',
    rating: 5,
  },
  {
    petId: 2,
    imageUrl:
      'https://vignette.wikia.nocookie.net/yugioh/images/f/f2/DarkRulerHaDes-BP01-EN-C-1E.png/revision/latest/scale-to-width-down/300?cb=20120616113335',
    description: 'sample monster effect',
    rating: 3,
  },
  {
    petId: 3,
    imageUrl:
      'https://i.pinimg.com/236x/2d/e0/b7/2de0b7946bb7c8427018694ce5464709.jpg',
    description: 'sample monster effect',
    rating: 1,
  },
];

app.get('/card-detail/:petId', (req, res) => {
  const petId = parseInt(req.params.petId);
  const pet = items.find((item) => item.petId === petId);

  const model = {
    pageTitle: 'Card Detail',
    components: [
      {
        type: 'featuredImage',
        data: {
          imageUrl: pet.imageUrl,
        }
      },
      {
        type: 'textRow',
        data: {
          text: pet.description,
        }
      },
      {
        type: 'rating',
        data: {
          rating: pet.rating,
        }
      }
    ]
  }

  res.json(model);
});

// localhost:3000 install nodemon qq
app.get('/pet-listing', (req, res) => {
    const model = {
        pageTitle: "Pets",
        components: [{
                type: "featuredImage",
                data: {
                    imageUrl: "https://cdn.dribbble.com/users/6734866/screenshots/17148502/slifer_the_sky_dragon.png"
                }
            },
            {
                type: "carousel",
                data: {
                    items: items.map(item => {
                        return {
                            petId: item.petId,
                            imageUrl: item.imageUrl
                        }
                    }),
                    action: {
                        type: "sheet",
                        destination: "petDetail"
                    }
                }
            },
            {
                type: "list",
                data: {
                    rows: [{
                        id: 1,
                         title: "Fluffy",
                         subTitle: "This is a great pet!",
                         imageUrl: "https://cdn.dribbble.com/users/6734866/screenshots/17148502/slifer_the_sky_dragon.png",
                         description: "text sample"
                    }],
                    action: {
                        type: "push",
                        destination: "petDetail"
                    }
                }
            }
        ]
    }
    

    res.json(model)
})

app.listen(3000, () => {
    console.log('Server is running...')
})