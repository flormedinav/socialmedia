import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    firstName: "Steve",
    lastName: "Ralph",
    email: "steve@test.com",
    password: "$2b$10$g2sfRahqaw7W7HQtxfxnTOj3vJCGtZkI0X2vVKq3ZW8kTQre4cB72",
    picture:
      "https://res.cloudinary.com/dwyt8jlrl/image/upload/v1707312799/social-media/fw2ol8letptrjt8cje0z.jpg",
    friends: [userIds[1]],
    location: "San Fran, CA",
    occupation: "Software Engineer",
    viewedProfile: 14561,
    impressions: 888822,
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@test.com",
    password: "$2b$10$j3B6OmZpzjEF0RmnhD2jy.DMAu5q00UtHSQsT3pCiqtVbJRq3ksYi",
    picture:
      "https://res.cloudinary.com/dwyt8jlrl/image/upload/v1707312888/social-media/hwckrgdfv3dqfq3ps3hg.jpg",
    friends: [userIds[2]],
    location: "New York, CA",
    occupation: "Modelo",
    viewedProfile: 12351,
    impressions: 55555,
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    firstName: "Jessica",
    lastName: "Dunn",
    email: "jessica@test.com",
    password: "$2b$10$pKPsRViyNK49YHHooICxruPzRJY3eVHAVUBNGLxoZVYnl.FhjGQc2",
    picture:
      "https://res.cloudinary.com/dwyt8jlrl/image/upload/v1707313279/social-media/jo5yapfp5ar4nlvsuhwd.jpg",
    friends: [userIds[3]],
    location: "Korea, CA",
    occupation: "Abogada",
    viewedProfile: 41024,
    impressions: 55316,
    createdAt: 1219214568,
    updatedAt: 1219214568,
    __v: 0,
  },
  {
    _id: userIds[3],
    firstName: "John",
    lastName: "Smite",
    email: "john@test.com",
    password: "$2b$10$iwo.sBl2Q4St.VnjwKKoM./.Bl2DV3WMKsLjiN6cChfW4cMBKD9au",
    picture:
      "https://res.cloudinary.com/dwyt8jlrl/image/upload/v1707313509/social-media/k9gjy4c5lw7uqziez8qg.jpg",
    friends: [userIds[4]],
    location: "Utah, CA",
    occupation: "Hacker",
    viewedProfile: 40212,
    impressions: 7758,
    createdAt: 1493463661,
    updatedAt: 1493463661,
    __v: 0,
  },
  {
    _id: userIds[4],
    firstName: "Harvey",
    lastName: "Dunn",
    email: "harvey@test.com",
    password: "$2b$10$X/tkZRWQQnmCxtgAa2NTSuAG4xNVumCIIT9mdAMYnvLYcbQCuw96i",
    picture:
      "https://res.cloudinary.com/dwyt8jlrl/image/upload/v1707331112/social-media/fwry013whokc07ondnpk.jpg",
    friends: [userIds[0]],
    location: "Los Angeles, CA",
    occupation: "Periodista",
    viewedProfile: 976,
    impressions: 4658,
    createdAt: 1381326073,
    updatedAt: 1381326073,
    __v: 0,
  },
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    user: userIds[0],
    description: "Nada como la tranquilidad del mar",
    picture:
      "https://res.cloudinary.com/dwyt8jlrl/image/upload/v1707313864/social-media/zl3i40bxxbyezxfcut3y.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[2], true],
    ]),
    comments: [
      {
        user: userIds[0],
        text: "Me encanta!",
      },
      {
        user: userIds[1],
        text: "Que belleza!",
      },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: userIds[1],
    description: "Empezando el día! Nada como una ensalada saludable",
    picture:
      "https://res.cloudinary.com/dwyt8jlrl/image/upload/v1707332448/social-media/rkqnpfg2zufebw3eumnv.jpg",
    likes: new Map([
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
    ]),
    comments: [
      {
        user: userIds[1],
        text: "Que rico!",
      },
      {
        user: userIds[2],
        text: "Debes pasarme la receta!",
      },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: userIds[2],
    description: "Vida saludable, visitando un nuevo restaurante",
    picture:
      "https://res.cloudinary.com/dwyt8jlrl/image/upload/v1707332471/social-media/lumct1lzsegitrlyjvwf.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[4], true],
      [userIds[2], true],
    ]),
    comments: [
      {
        user: userIds[2],
        text: "Que rico!",
      },
      {
        user: userIds[4],
        text: "Me encanta, dónde es?",
      },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: userIds[3],
    description: "Muchas felicidades! Muy feliz por ustedes!",
    picture:
      "https://res.cloudinary.com/dwyt8jlrl/image/upload/v1707332505/social-media/rsivmul1clccvu8vqcp1.jpg",
    likes: new Map([
      [userIds[1], true],
      [userIds[2], true],
    ]),
    comments: [
      {
        user: userIds[4],
        text: "Felicidades!",
      },
      {
        user: userIds[0],
        text: "Lo mejor para ellos!",
      },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: userIds[4],
    description: "Almorzando en KFC",
    picture:
      "https://res.cloudinary.com/dwyt8jlrl/image/upload/v1707332568/social-media/vrilnauwl3ivxwlkltml.jpg",
    likes: new Map([
      [userIds[1], true],
      [userIds[0], true],
      [userIds[2], true],
    ]),
    comments: [
      {
        user: userIds[1],
        text: "Buenísimo, cuánto nos juntamos?",
      },
      {
        user: userIds[0],
        text: "Que rico!",
      },
    ],
  },
];
