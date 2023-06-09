const bcrypt=require('bcryptjs')
const data={    
    TrendingData:[
        {
        name:"Ashland",
        image:'https://res.cloudinary.com/dkzuuda7n/image/upload/v1680445990/minty_2_ndsdiy.png', 
        no_of_review:13,
        countInStock:1,
        category:'plain',
        price:20,
        description:'Ashland is a virtual plain land ',
        rating:4.3},
        {name:"Cleveland",
        image:'https://res.cloudinary.com/dkzuuda7n/image/upload/v1680445985/minty_5_rag5o6.png',
        no_of_review:23,
        countInStock:1,
        category:'plain', 
        price:20,
        description:'Cleveland is a virtual plain land located in Cleve',
        rating:4.0},
        {name:"Cherryland",
        image:'https://res.cloudinary.com/dkzuuda7n/image/upload/v1680445983/minty_7_twoizj.png',
        no_of_review:53,
        countInStock:10,
        category:'shoe',
        price:20,
        description:'Cherryland is a virtual plain land located in Cherry',
        rating:4.0},
        {name:"Cloverland",
        image:'https://res.cloudinary.com/dkzuuda7n/image/upload/v1680445983/minty_4_zfgtm2.png',
        no_of_review:53,
        countInStock:1,
        category:'plain',
        price:5,
        description:'Cloverland is a virtual plain land located in Clover',
        rating:4.0},
        {name:"Cortland",
        image:'https://res.cloudinary.com/dkzuuda7n/image/upload/v1680445979/minty_6_kosjns.png',
        no_of_review:21,
        countInStock:1,
        category:'valley',
        price:5,
        description:'Cortland is a virtual valley land located in Cort',
        rating:5.0},
        {name:"Dairyland",image:'https://res.cloudinary.com/dkzuuda7n/image/upload/v1680445972/Ashland_j3xgpu.png',no_of_review:53,
        countInStock:1,
        category:'sloapy',
        price:5,
        description:'Dairyland is a virtual sloapy land located in Dairy',
        rating:3.7},
        {
            name:"Forkland",
            image:'https://res.cloudinary.com/dkzuuda7n/image/upload/v1680445962/minty_3_c4hisj.png', 
            no_of_review:13,
            countInStock:1,
            category:'island',
            price:10,
            description:'Forkland is a virtual plain land ',
            rating:4.3},
            {name:"Kirtland",
            image:'https://res.cloudinary.com/dkzuuda7n/image/upload/v1680445962/deliver_mimxyt.png',
            no_of_review:23,
            countInStock:1,
            category:'plain', 
            price:5,
            description:'Kirtland is a virtual plain land located in Kirt',
            rating:4.0},
            {name:"Oakland",
            image:'https://res.cloudinary.com/dkzuuda7n/image/upload/v1680445957/minty_1_kdcoze.png',
            no_of_review:3,
            countInStock:10,
            category:'shoe',
            price:5,
            description:'Oakland is a virtual plain land located in Oak',
            rating:4.4},
            {name:"Ragland",
            image:'.https://res.cloudinary.com/dkzuuda7n/image/upload/v1680098986/r4_ynhyoa.png',
            no_of_review:53,
            countInStock:1,
            category:'sloap',
            price:5,
            description:'Ragland is a virtual plain land located in Rag',
            rating:4.0},
            {name:"Woodland",
            image:'https://res.cloudinary.com/dkzuuda7n/image/upload/v1680098971/fi1_kuvusr.png',
            no_of_review:21,
            countInStock:1,
            category:'valley',
            price:5,
            description:'Woodland is a virtual valley land located in Wood',
            rating:5.0},
            {name:"Dixieland",image:'https://res.cloudinary.com/dkzuuda7n/image/upload/v1680098975/f6_o8lq83.png',no_of_review:53,
            countInStock:1,
            category:'sloapy',
            price:5,
            description:'Dixieland is a virtual sloapy land located in Dixieland',
            rating:3.7},        
    ],
        RecentSold:[
            {name:"Everland",image:'https://res.cloudinary.com/dkzuuda7n/image/upload/v1680098975/f6_o8lq83.png',rarity:"common",volume:900,landSize:"https://res.cloudinary.com/dkzuuda7n/image/upload/v1680098975/f6_o8lq83.png"},
            {name:"Gardaland",image:'https://res.cloudinary.com/dkzuuda7n/image/upload/v1680098975/f6_o8lq83.png',rarity:"common",volume:900,landSize:"https://res.cloudinary.com/dkzuuda7n/image/upload/v1680098975/f6_o8lq83.png"},
            {name:"Kings Island",image:'https://res.cloudinary.com/dkzuuda7n/image/upload/v1680098975/f6_o8lq83.png',rarity:"common",volume:900,landSize:"https://res.cloudinary.com/dkzuuda7n/image/upload/v1680098975/f6_o8lq83.png"},
            {name:"Legoland",image:'https://res.cloudinary.com/dkzuuda7n/image/upload/v1680098975/f6_o8lq83.png',rarity:"common",volume:900,landSize:"https://res.cloudinary.com/dkzuuda7n/image/upload/v1680098975/f6_o8lq83.png"},
            {name:"Wonderland",image:'https://res.cloudinary.com/dkzuuda7n/image/upload/v1680098975/f6_o8lq83.png',rarity:"common",volume:900,landSize:"https://res.cloudinary.com/dkzuuda7n/image/upload/v1680098975/f6_o8lq83.png"},
            ],
    
    user:[
        {
            name:"Admin",
            isAdmin:true,
            password:bcrypt.hashSync('1234'),
            email:"sundayomoladee11@gmail.com"
        },
        {
            name:"Sunday",
            isAdmin:false,
            password:bcrypt.hashSync('1234'),
            email:"sunday11@gmail.com",
            asset:[ 
                {
                    productId:'09399ki92dhyieiolksdg334',
                    ProductName:'Richland',
                    ProductPrice:0.000455533,
                    ProductImage:'https://res.cloudinary.com/dkzuuda7n/image/upload/v1680445957/minty_1_kdcoze.png',
                    ProductDescription:'Richland is a virtual plainLand'
                }
            ]
        },
    ]

}
module.exports={data}