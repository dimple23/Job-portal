//"_id" : ObjectId("5cdaf13015879348c67653e5"),

//use jobportal;

db.job.insert({"title": "Full stack devloper", "jobtype": "fulltime", "position" : "jr","location":"Parsippany","company": "tcg","description": "it is a full time job",

"userid": "5cdaf13015879348c67653e5"})

db.job.insert({"title": "Full stack devloper", "jobtype": "fulltime", "position" : "sr","location":"Monterial","company": "tcg","description": "it is a full time job",

"userid": "5cdaf80515879348c67653ea"})


db.job.find({

  "title": "Full stack devloper",
  "jobtype":  "fulltime",
  user:[{"userid": "5cdaf80515879348c67653ea"}]

})