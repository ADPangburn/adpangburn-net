// App.jsx — shell. Tracks route, renders view.
function App() {
  const [route, setRoute] = React.useState({ name: "home" });

  const openPost = (post) => setRoute({ name: "post", postId: post.id });
  const goBack = (maybePost) => {
    if (maybePost && maybePost.id) setRoute({ name: "post", postId: maybePost.id });
    else setRoute({ name: "home" });
  };
  const navigate = (r) => setRoute(r);

  let view;
  if (route.name === "home") {
    view = <HomeView posts={window.POSTS} onOpenPost={openPost} />;
  } else if (route.name === "post") {
    const p = window.POSTS.find((p) => p.id === route.postId) || window.POSTS[0];
    view = <PostView post={p} posts={window.POSTS} onBack={goBack} />;
  } else if (route.name === "about") {
    view = <AboutView />;
  }

  return (
    <div data-screen-label={`aaron@pangburn:~$ · ${route.name}`} style={appStyles.page}>
      <div style={appStyles.col}>
        <Header route={route} onNavigate={navigate} />
        <main>{view}</main>
        <Footer />
      </div>
    </div>
  );
}

const appStyles = {
  page: {
    minHeight: "100vh",
    background: "var(--bg)",
    color: "var(--fg)",
  },
  col: {
    maxWidth: "880px",
    margin: "0 auto",
    padding: "0 32px",
  },
};

window.App = App;
