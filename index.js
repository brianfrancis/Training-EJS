import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import dateFormat from "dateformat";

const app = express();
const port = 3000;

app.use(express.static("public"))

app.use(expressEjsLayouts)
app.set('layout', './layouts/full-width')
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));

function BlogPost(title, fulltext, createdOn, updatedOn) {
  this.title = title;
  this.fulltext = fulltext;
  this.createdOn = dateFormat(createdOn, "dddd, mmmm dS, yyyy, h:MM:ss TT");
  this.updatedOn = dateFormat(updatedOn, "dddd, mmmm dS, yyyy, h:MM:ss TT");
}

let now = new Date;

const post1 = "Lorem ipsum odor amet, consectetuer adipiscing elit. Etiam nascetur commodo ipsum lectus, mus senectus. Nascetur a aptent luctus et vel purus. Cubilia integer vehicula lacinia porta praesent suscipit quisque. Fermentum himenaeos tellus libero adipiscing sollicitudin vivamus sociosqu dolor ante. Ipsum pellentesque non facilisi, velit cursus penatibus feugiat diam. Sem nibh primis bibendum magna eros. Molestie aptent nunc purus accumsan conubia mauris.Sit metus hendrerit at laoreet sollicitudin leo euismod neque. Metus scelerisque bibendum et nisl fusce. Maecenas morbi rutrum ex hendrerit nam, ornare turpis fames dis. Egestas donec litora tincidunt dui lorem leo. Interdum eleifend tortor gravida lacinia aliquam parturient? Nam class phasellus rhoncus ante nullam magna. Platea torquent pulvinar faucibus, libero mollis torquent vel. Curabitur cursus et parturient elementum nostra litora urna auctor. Scelerisque proin tristique posuere ac leo, tellus imperdiet nisi. Ante porta dictumst lacinia imperdiet sapien mattis a nisl mollis.Habitant integer erat pharetra ac eros rhoncus sollicitudin. Faucibus fames sollicitudin conubia primis himenaeos pharetra porta ex. Tristique fringilla sem suscipit odio accumsan. Eros tempus montes tempus at habitasse maximus. Fusce tincidunt vitae fusce urna risus. Aenean nisi efficitur duis interdum laoreet felis. Id tempus vulputate tellus curae faucibus ultricies donec. Elit pulvinar morbi cubilia feugiat mi est ipsum diam.Vitae posuere rhoncus pellentesque nascetur rhoncus. Condimentum senectus maximus nullam duis maximus condimentum dictum. Vel mauris bibendum eget egestas arcu eleifend finibus. Arcu purus suscipit euismod lacinia posuere neque interdum. Venenatis id sagittis lectus mus montes sed interdum sagittis. Ex et mus viverra cras feugiat. Libero tristique odio sodales; egestas sed nisl. Curabitur vulputate diam vel diam sapien malesuada. Risus aptent mollis nulla risus ipsum nulla nullam.Fermentum velit eleifend tempus nulla consectetur molestie. Porttitor purus venenatis in efficitur dictum ac. Eleifend eleifend euismod porta mus metus. Faucibus maximus libero efficitur orci tellus magna. Finibus senectus arcu iaculis dis in ornare facilisis vestibulum. Justo eu sociosqu arcu ad vivamus sit commodo."

var blogPosts = [
  new BlogPost("The very first blog post I made up", post1, now, now),
  new BlogPost("The very next blog post I then made up", post1, now, now)
]

app.get("/", (req, res) => {
    res.render("index", {title : "Crappy Blog Homepage", posts: blogPosts, layout: "./layouts/sidebar"}
  );
})


app.get("/view-post", (req, res) => {
  const i = req.query.postid;
  res.render("view-post", {title : "View Post", post: blogPosts[i], posts:blogPosts, layout: "./layouts/sidebar"}
);
})

app.get("/create-post", (req, res) => {
  res.render("create-post", {title : "Create Post", posts:blogPosts, layout: "./layouts/sidebar"}
  );
})

app.post("/submit", (req, res) => {
  
  let now = new Date;

  let newPost = new BlogPost(req.body["title"], req.body["fulltext"], now, now);

  blogPosts.push(newPost);

  console.log(blogPosts)

  res.render("index", {title : "Crappy Blog Homepage", posts: blogPosts, layout: "./layouts/sidebar"}
  );
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
