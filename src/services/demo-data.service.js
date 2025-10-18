import { usersService } from "./users.service.js";
import { propertiesService } from "./properties.service.js";

const users = [
    usersService.getEmptyUser('Alice Johnson','https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_1280.png', 'alicej',),
    usersService.getEmptyUser('Bob Smith','https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', 'bobsmith',),
    usersService.getEmptyUser('Charlie Brown','https://static.wixstatic.com/media/449abe_5bcdc480851443d6b592c87fa3552f4e~mv2.jpg/v1/fill/w_744,h_744,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cb-color.jpg', 'charlieb',),
    usersService.getEmptyUser('Diana Prince','https://static.wikia.nocookie.net/marvel_dc/images/c/cc/Wonder_Woman_Vol_5_4_Textless.jpg/revision/latest?cb=20160810132845', 'dianap',),
    usersService.getEmptyUser('Ethan Hunt','https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_1280.png', 'ethanh',),
    usersService.getEmptyUser('Fiona Gallagher','https://decider.com/wp-content/uploads/2019/03/shameless-season-9-finale-emmy-rossum.jpg?quality=75&strip=all&w=978&h=652&crop=1', 'fionag',),
]

const demoPropertiesPictures = [
    'https://st.hzcdn.com/simgs/97910d6b0407c3d1_14-0485/_.jpg',
    'https://www.marthastewart.com/thmb/lxfu2-95SWCS0jwciHs1mkbsGUM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/modern-living-rooms-wb-1-bc45b0dc70e541f0ba40364ae6bd8421.jpg',
    'https://www.marthastewart.com/thmb/JSJwSMsolMumuoCAHHIjICbzYgs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/BradRamseyInteriors_credit_CarolineSharpnack-dee35c1fab554898af7c549697c2f592.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOUTnj8To32CSO4Ea4_ZhHkz4JSHOaqGORPg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGmkx2Umg4LvSkn2y12K_ClQgk6W_F02SzhA&s',
    'https://cdn.mos.cms.futurecdn.net/rmUuWniHKpPEUMi6n7P8Ra.jpg',
    'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/at%2Fstyle%2F2023-09%2Fliving-room-decor-ideas%2Fpattern-play',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLL24UVBb5PlHH3IfwtNIxXrqXl9hH_DHgRg&s',
    'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_2560,h_1598/https://www.essentialhome.eu/inspirations/wp-content/uploads/2024/11/32-Elegant-Living-Rooms-That-Showcase-the-Art-of-Luxury_21-min-scaled.jpg',
    'https://cdn.mos.cms.futurecdn.net/FjF4p3nsgJPamTvvYRna84.jpg',
    'https://media.designcafe.com/wp-content/uploads/2020/03/21012613/luxury-living-room-designs.jpg',
    'https://cdn.mos.cms.futurecdn.net/H73mVvQQs96oPvDTPPWTTY.jpg',
    'https://cdn.decorilla.com/online-decorating/wp-content/uploads/2023/10/Living-room-decor-trends-2024.jpg?width=900',
    'https://i.ytimg.com/vi/WpT-Lp_HaH4/maxresdefault.jpg',
    'https://i.ytimg.com/vi/RfYc0BUqkMs/maxresdefault.jpg',
    'https://hips.hearstapps.com/hmg-prod/images/apartment-living-room-design-ideas-hbx040122nextwave-013-1656022467.jpg?crop=1.00xw:0.747xh;0,0.200xh&resize=1200:*',
    'https://www.thespruce.com/thmb/8O_XGPj2llBN0TGCXtFz5GUrytM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rsw984h656-d6d00a18536d4afc8b48c0da03702ea7.jpeg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWo0aS9TAekC52w9HOswNpPX1tWd-Oo0z4Ew&s',
    'https://www.familyhandyman.com/wp-content/uploads/2023/02/neutral-design-small-apartment-via-instagram-e1677523038814.jpg?fit=700%2C700',
    'https://media.designcafe.com/wp-content/uploads/2020/02/21010329/modern-living-room-design-ideas.jpg',
    'https://www.thespruce.com/thmb/-QgLBTD5X5b-VmmUPyTyZUS99r0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9H4A5504copy-4e4e05eda0e74a50a2846d3ac5d9127c.jpg',
    'https://www.luxurychicagoapartments.com/wp-content/uploads/2023/03/Seven-10-West-2-Bedroom-06.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvCRg9I-ka9v9ZeE9wAxApn7YC2SY7XK8nAg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfrZSUKXq694ka-j6dGqnkvRmplC_jpuxVLw&s',
    'https://stylebyemilyhenderson.com/wp-content/uploads/2020/10/IMG_6041-3.jpg',
    'https://cdn.decoist.com/wp-content/uploads/2020/04/Separate-bedroom-in-the-one-bedroom-apartment-gives-you-ample-privacy-84410.jpg',
    'https://d28pk2nlhhgcne.cloudfront.net/assets/app/uploads/sites/3/2023/03/2-bedroom-apartment-floor-plans-1-1-1.png',
    'https://cdn.apartmenttherapy.info/image/upload/v1725034090/at/house%20tours/2024/august/emmy-p/tours-losangeles-emmy-p-02.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZp_u152bOPvJUhl8NLlalfpGSNDxngp5SoA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaAvDwM6MCgs_rm6b0GAxfXtrQN7Eo9tMJGQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmXeWRUy5n8bXxlUfvxESGOMm2NqlDq-ahbw&s',
    'https://livingsuites.com/wp-content/uploads/2020/06/1.-Three-Bedroom-Apartment-door-connecting-1.jpg',
    'https://cdn.apartmenttherapy.info/image/upload/v1691674550/at/house%20tours/2023-House-Tours/2023-August/jhenene-l/tours-nyc-jhenene-l-03.jpg',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/363133922.jpg?k=5057b2e4a16c00914d884d3c71d3302a9fe75c77c7e7d04b232671efba1a2229&o=&hp=1',
    'https://www.redfin.com/blog/wp-content/uploads/2022/10/item_3-2.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLgZqjl8Vy-ZgnPE-tmeyfQRzgagexIMJ4fQ&s',
    'https://2024-rd-staging.nyc3.cdn.digitaloceanspaces.com/2024-prepare-for-canada/2024/11/16162323/Why-a-2-bedroom-apartment-Featured-Image.png',
    'https://tlv2go.com/wp-content/uploads/2020/10/%D7%97%D7%93%D7%A8-%D7%A9%D7%99%D7%A0%D7%94-e1618399252707.jpg',
    'https://lh7-rt.googleusercontent.com/docsz/AD_4nXf4-uB-n3bdTT9beBkzWqPxBtdnhauSPeibtDWMt8sTn-XhtO6ZRydComDg6MJnN_DT3kh84VJOb2yGNWJXPi26m5k41wIypXZ4si4-eZar3g5Jr6lf7pQztqgHwr_T60CYveulTEIiZmzFqqtrHcPZR4kP?key=SFAp1cLSLLhyyupiKp5-Cg',
    'https://cdn.decoist.com/wp-content/uploads/2020/04/Classic-Studio-Apartment-in-Manhattan-where-the-bedroom-becomes-a-part-of-the-living-space-95615.jpg',
    'https://hips.hearstapps.com/hmg-prod/images/1737-q54a-jm-0403-lowres-designer-jennifer-mcgee-67dc655a1d1ac.jpg',
    'https://thelondonbathco.co.uk/wp-content/uploads/2021/07/iStock-1285717693-1920x1280.jpg',
    'https://getcanopy.co/cdn/shop/articles/pexels-christa-grover-977018-1910472_a6eacbcd-2d05-4163-aea7-af448d9d7a95.jpg?v=1732249806',
    'https://i.pinimg.com/736x/0d/8d/45/0d8d451ef2f2eecf040b38049febdf27.jpg',
    'https://bendmagazine.com/wp-content/uploads/2022/04/light-turquoise-spa-like-bathroom-Analicia-Herrmann.jpg',
    'https://cdn.mos.cms.futurecdn.net/jTf2tgYVw54nc4PEvjBVtT.jpg',
    'https://www.freestandingbath.co.uk/wp-content/uploads/2025/02/luxury-bathroom-featured.jpg',
    'https://imgix.cosentino.com/en-ie/wp-content/uploads/2025/02/Cosentino_Booth_KBIS_2025_15.jpg?auto=format%2Ccompress&ixlib=php-3.3.0',
    'https://bathtrendsusa.com/cdn/shop/files/24.jpg?v=1721336556&width=2800',
    'https://www.bellabathrooms.co.uk/blog/wp-content/uploads/2020/09/iStock-1158066696-1.jpg',
    'https://www.bellabathrooms.co.uk/blog/wp-content/uploads/2020/09/iStock-1158066696-1.jpg',
    'https://adamsez.com/wp-content/uploads/2024/10/home_2.jpg',
    'https://images.unsplash.com/photo-1696987007764-7f8b85dd3033?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwYmF0aHJvb218ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000',
    'https://duravitprod-media.e-spirit.cloud/75e15e67-f417-4084-8696-5e4151ad35b8/images/Planung-Inspiration/Magazin/6-Schritte-zum-Traumbad/whitetulip_culture_01_2_1.jpg',
    'https://www.thespruce.com/thmb/J53yaSLGsDzkOOTYiXuP52oMJ8I=/2048x0/filters:no_upscale():max_bytes(150000):strip_icc()/modern-bathroom-design-ideas-4129371-hero-723611e159bb4a518fc4253b9175eba8.jpg',
    'https://img.freepik.com/free-photo/modern-bathroom-with-bathtub-double-sink-vanity-smart-home-technology_9975-33078.jpg?semt=ais_hybrid&w=740&q=80',
    'https://ahouseinthehills.com/wp-content/uploads/2023/11/Efficiency-Meets-Style-Modern-Bathroom-Products-for-Contemporary-Homes-scaled.jpeg',
    'https://showroom.coburns.com/wp-content/uploads/2022/01/sidekix-media-g51F6-WYzyU-unsplash.jpg',
    'https://thegreenfortune.com/wp-content/uploads/2025/06/download-12-1-404x500.webp',
    'https://res.cloudinary.com/dw4e01qx8/f_auto,q_auto/images/m8jt2phsv9gjety3w1ub',
    'https://media.designcafe.com/wp-content/uploads/2020/08/29114351/options-for-seating-in-balcony-interior-design.jpg',
    'https://media.admiddleeast.com/photos/6682dcd29964267a3a5503f7/master/w_1600%2Cc_limit/By%2520Michael%2520Stavaridis.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcz8c7qM15x4nMub-Ehlc40-QB1XKAWpe09Q&s',
    'https://media.designcafe.com/wp-content/uploads/2020/02/21004553/balcony-furniture-ideas.jpg',
    'https://thearchitectsdiary.com/wp-content/uploads/2024/04/Types-of-balcony-9-1024x667.webp',
    'https://cdn.aarp.net/content/dam/aarp/home-and-family/your-home/2021/02/1140-woman-balcony.jpg',
    'https://assets.architecturaldigest.in/photos/62e1222e9e358822d96a421b/master/pass/5%20balcony%20design%20ideas%20to%20create%20a%20cozy%20outdoor%20space%20during%20the%20monsoon.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKXmS87gQXYZkoiqDZlIhUhKYMwTbl5zUtzA&s',
    'https://my-geranium.com/wp-content/uploads/sites/2/2025/03/2025-Geranien-5000-Frohliches-Leben-im-Freien-06.jpg',
    'https://contemporarystructures.co.uk/wp-content/uploads/2023/11/lumon-balcony-glazing-roof-1280x914-1.webp',
    'https://hips.hearstapps.com/hmg-prod/images/gettyimages-1185723502-1https://hips.hearstapps.com/hmg-prod/images/gettyimages-1185723502-170667a-665f827a6a143.jpg?crop=1xw:1xh;center,top70667a-665f827a6a143.jpg?crop=1xw:1xh;center,top',
    'https://cdn.mos.cms.futurecdn.net/SBEc9byj6fg7aaGVfiKuqf.jpg',
    'https://foyr.com/learn/wp-content/uploads/2019/03/balcony-design-ideas-scaled-1200x675.jpg',
    'https://cdn.mos.cms.futurecdn.net/bJauktLkEuUrjXXKNUaPAh.jpg',
    'https://blog.displate.com/wp-content/uploads/2022/09/Balcony-Ideas_23.jpg',
    'https://www.thespruce.com/thmb/pxHUZL7HME0HMU2h0l57g8OFGHk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/JessBungeforEHDtinybalcony-58af2c107b074437bd0bf0993fb43187.jpeg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyncK8nofaQGyKEFPKqd-SSpoUyeyOjTY2XA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYgbAhD_fGrR7jA1pEXjYyQAZh5x_qC07qgg&s',
    'https://api.photon.aremedia.net.au/wp-content/uploads/sites/2/2018/01/small-balcony-ideas.jpg?fit=1920%2C1080',
    'https://media.designcafe.com/wp-content/uploads/2023/07/05145205/balcony-storage-solutions.jpg'
]

const nameParts=['Sunset','Pines', 'Rout 9', 'Pinecrest', 'Highway', "Traveler's", "Evergreen", 'Stop',
                 'Desert', 'Palms', 'Stopover', 'Coastline', 'Moonlight', 'Crossroads', 'Road', 'Blubird',
                 'Orchard', 'Trail', 'Valley', 'View', 'Lakeside', 'Golden', 'Harbor', 'Starlit', 'House',
                 'Summit', 'Inn', 'Park', 'North', 'West', 'East', 'South', 'Ember', 'Lodge', 'Grove']

const amenities=['TV', 'Wifi', 'Kitchen', 'Smoking allowed', 'Pets allowed', 'Cooking basics', 'A/C', 'Pool', 'Hot tub',
                 'Free Parking', 'Washer', 'Dryer', 'Heating', 'Workspace', 'Hairdryer','Iron', 'EV charger', 'Crib', 
                 'King bed', 'Gym', 'Grill', 'Indoor fireplace', 'Beachfront', 'Waterfront', 'Smoke alarm', 'Carbon monoxide alarm',
                 'Self check-in','free cancelation',]

const propertyType=['House', 'Apartment', 'Guesthouse', 'Hotel']

const accessibility=['Step-free access', 'Disabled parking', 'Wide entrance', 'Step-free bedroom', 'Wide bedroom enterance',
                     'Step-free bathroom', 'Wide bathroom enterance', 'Toilet grab bar', 'Shower grab bar', 'Step-free shower',
                     'bath chair', 'Ceilling or mobile host']



function getPictures(num=5){
    const arr=[]
    for(let i=0;i<num;i++){
        const idx = Math.floor(Math.random()*demoPropertiesPictures.length)
        arr.push(demoPropertiesPictures[idx])
    }

    return arr
}

function getName(){
    const idx1 = Math.floor(Math.random()*nameParts.length)
    const idx2 = Math.floor(Math.random()*nameParts.length)
    return `${nameParts[idx1]} ${nameParts[idx2]}`
}

