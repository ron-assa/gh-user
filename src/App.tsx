import { useEffect, useRef, useState } from "react";
import {
  IonApp,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonThumbnail,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { refreshOutline, searchOutline } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  const ghUserInputRef = useRef<HTMLIonInputElement>(null);
  const [ghUserData, setGhUserData] = useState<any>({});
  const [ghUserId, setGhUserId] = useState<any>();
  const [ghMessage, setGhMessage] = useState<string>("");

  // this works 1/30/2022 07:18 PM
  // useEffect(() => {
  //   const fetchData = async () => {
  //     let loadedData = await fetch(
  //       "https://api.github.com/users/facebookzzz"
  //     ).then((response) => response.json());
  //     //alert(JSON.stringify(loadedData)); //works
  //     if (loadedData.twitter_username) {
  //       loadedData.twitter_username =
  //         "https://twitter.com/" + loadedData.twitter_username;
  //     }
  //     loadedData.blog_url = "";
  //     if (loadedData.blog) {
  //       if (loadedData.blog.startsWith("http")) {
  //         loadedData.blog_url = loadedData.blog;
  //       } else {
  //         loadedData.blog_url = "https://" + loadedData.blog;
  //       }
  //     }
  //     console.log(JSON.stringify(loadedData));
  //     setGhUserData(loadedData);
  //     //alert(JSON.stringify(ghUserData)); //does not display
  //     // alert('after loadedData'); //this fires when setGhUserData is successful
  //   };
  //   fetchData();
  // }, []);

  const blankData: object = {
    avatar_url: "",
    name: "",
    bio: "",
    login: "",
    ghu_blog_url: "",
    blog: "",
    location: "",
    html_url: "",
    twitter_username: "",
    ghu_twitter_url: "",
  };

  const fetchData = async (userId: string) => {
    try {
      userId = userId.trim();
      if (!userId) {
        return;
      }
      let loadedData = await fetch(
        "https://api.github.com/users/" + userId
      ).then((response) => response.json());
      //alert(JSON.stringify(loadedData)); //works
      if (!loadedData.login) {
        // loadedData = {}
        // setGhUserId(null);
        //setGhUserData(loadedData);
        // const ghuMessageDiv = document.getElementById("ghuMessageDiv");
        // ghuMessageDiv!.innerHTML = `
        //     GitHub User ID: ${userId}<br />
        //     Not Found.<br />
        //     Try "facebook" or "twitter".
        // `;
        setGhMessage(`
        Entered GitHub user ID not found.
        Try "facebook" or "twitter" or "python".
        `);
        return;
      }
      loadedData.ghu_twitter_url = "";
      if (loadedData.twitter_username) {
        loadedData.ghu_twitter_url =
          "https://twitter.com/" + loadedData.twitter_username;
      }
      loadedData.ghu_blog_url = "";
      if (loadedData.blog) {
        if (loadedData.blog.startsWith("http")) {
          loadedData.ghu_blog_url = loadedData.blog;
        } else {
          loadedData.ghu_blog_url = "https://" + loadedData.blog;
        }
      }
      console.log(JSON.stringify(loadedData));
      setGhUserData(loadedData);
      //alert(JSON.stringify(ghUserData)); //does not display
      // alert('after loadedData'); //this fires when setGhUserData is successful
    } catch {
      console.log("fail");
    }
  };

  const getGhUser = () => {
    const enteredGhUser = ghUserInputRef.current!.value;
    // const ghuMessageDiv = document.getElementById("ghuMessageDiv");
    // ghuMessageDiv!.innerHTML = "";
    setGhUserData(blankData);
    setGhMessage("");
    // if (!ghUserData.login) {
    //   const ghuMessageDiv = document.getElementById("ghuMessageDiv");
    //   ghuMessageDiv!.innerHTML = "";
    // }

    if (!enteredGhUser) {
      // ghuMessageDiv!.innerHTML = `
      //   Please enter a GitHub User ID.<br />
      //   Try "facebook" or "twitter".
      // `;
      setGhMessage(`
        Please enter a GitHub User ID.
        Try "facebook" or "twitter" or "python".
      `);
      return;
    }

    setGhUserId(enteredGhUser);

    fetchData(enteredGhUser.toString());
  };

  const resetInputs = () => {
    ghUserInputRef.current!.value = "";
    ghUserInputRef.current?.setFocus();
    setGhUserId(null);
    setGhUserData(blankData);
    // if (!ghUserData.login) {
    //   const ghuMessageDiv = document.getElementById("ghuMessageDiv");
    //   ghuMessageDiv!.innerHTML = "";
    // }
    setGhMessage("");
    // does not work...
    // const ghuMessageDiv = document.getElementById("ghuMessageDiv");
    // if (!ghuMessageDiv) {
    //   ghuMessageDiv!.innerHTML = "";
    // }
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>GitHub User Information</IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Enter a GitHub User ID to Inquire:</IonLabel>
                <IonInput ref={ghUserInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-left">
              <IonItem>
                <IonButton onClick={getGhUser}>
                  <IonIcon slot="start" icon={searchOutline}></IonIcon>
                  Search
                </IonButton>
              </IonItem>
            </IonCol>
            <IonCol className="ion-text-right">
              <IonItem>
                <IonButton onClick={resetInputs}>
                  <IonIcon slot="start" icon={refreshOutline}></IonIcon>
                  Reset
                </IonButton>
              </IonItem>
            </IonCol>
          </IonRow>
          {/* this works, just not needed... 
           {ghUserId && (
            <IonRow>
              <IonCol>
                <IonCard>
                  <IonCardContent>
                    <h1>{ghUserId}</h1>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          )} */}
          {/* <IonRow>
            <IonCol> */}
          {/* <div id="ghuInfoDiv"> */}
          {/* <p>{JSON.stringify(ghUserData)}</p> */}
          {/* <p>{ghUserData.login)}</p> */}
          {/* the following does not work because the object only has one record
                      therefore, just need to refer to the object.value */}
          {/* {ghUserData.map(ghUser => (
                      <>
                        <h3>User ID: {ghUser.login}</h3>
                        <p>
                          Name: {ghUser.name}<br />
                          Blog: {ghUser.blog}<br />
                          Location: {ghUser.location}<br />
                          Links: <a href="{ghUser.html_url}">GitHub</a>
                          <a href="https://twitter.com/{ghUser.twitter}">Twitter</a>
                        </p>
                      </>
                    ))} */}
          {/* does not work ...
                     {'<a href="https://twitter.com/' + {ghUserData.twitter} + '">Twitter</a>'} */}
          {/* <IonCard> //this works overall but not thumbnail in this position
                  <IonCardHeader>
                    <IonCardTitle>{ghUserData.name}</IonCardTitle>
                    <IonThumbnail slot="end">
                      <img src={ghUserData.avatar_url} />
                    </IonThumbnail>
                  </IonCardHeader>
                  <IonCardContent>
                    Bio: {ghUserData.bio}
                    <br />
                    Login: {ghUserData.login}
                    <br />
                    Blog:{" "}
                    <a href={ghUserData.ghu_blog_url}>{ghUserData.blog}</a>
                    <br />
                    Location: {ghUserData.location}
                    <br />
                    Links: <a href={ghUserData.html_url}>GitHub</a>&nbsp;&nbsp;
                    <a href={ghUserData.ghu_twitter_url}>Twitter</a>
                  </IonCardContent>
                </IonCard> */}
          {ghUserData.login && (
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonThumbnail slot="start">
                    <img src={ghUserData.avatar_url} />
                  </IonThumbnail>
                  <IonLabel>{ghUserData.name}</IonLabel>
                </IonItem>
                <IonItem>
                  <p>
                    Bio: {ghUserData.bio}
                    <br />
                    Login: {ghUserData.login}
                    <br />
                    Blog:{" "}
                    <a href={ghUserData.ghu_blog_url}>{ghUserData.blog}</a>
                    <br />
                    Location: {ghUserData.location}
                    <br />
                    Links: <a href={ghUserData.html_url}>GitHub</a>
                    &nbsp;&nbsp;
                    <a href={ghUserData.ghu_twitter_url}>Twitter</a>
                  </p>
                </IonItem>
              </IonCol>
            </IonRow>
          )}
          {/* {!ghUserData.login && (
            <IonRow>
              <IonCol>
                <IonItem>
                  <div id="ghuMessageDiv"></div>
                  GitHub User ID: {ghUserId}
                    <br />
                    Not Found.
                    <br />
                    Try "facebook" or "twitter".
                </IonItem>
              </IonCol>
            </IonRow>
          )} */}
          {ghMessage && (
            <IonRow>
              <IonCol>
                <IonItem>
                  {ghMessage}
                </IonItem>
              </IonCol>
            </IonRow>
          )}
          {/* </div> */}
          {/* </IonCol>
          </IonRow> */}
        </IonGrid>
      </IonContent>
    </IonApp>
  );
};

export default App;
