import React, {useEffect} from "react";
import PushNotification from "react-native-push-notification";

// export class PushController extends Component{
//     componentDidMount(){
//         PushNotification.configure({
//             // (optional) Called when Token is generated (iOS and Android)
//             onRegister: function(token) {
//               //Todo call the post registration api endpoint
//               console.log("TOKEN:", token);

//             },
          
//             // (required) Called when a remote or local notification is opened or received
//             onNotification: function(notification) {
//               console.log("NOTIFICATION:", notification);

//               // process the notification here
//               notification.foreground(false); // BOOLEAN: If the notification was received in foreground or not
//               notification.userInteraction(false); // BOOLEAN: If the notification was opened by the user from the notification area or not
//               notification.message('My Notification Message'); // STRING: The notification message
//               notification.data({}); // OBJECT: The push data or the defined userInfo in local notifications

//               // required on iOS only 
//               // notification.finish(PushNotificationIOS.FetchResult.NoData);
//             },
//             // Android only
//             senderID: "1090501687137",
//             // iOS only
//             permissions: {
//               alert: true,
//               badge: true,
//               sound: true
//             },
//             popInitialNotification: true,
//             requestPermissions: true
//           });
//     }

//     render(){
//         return null;
//     }
// }

const PushController = (props) => {

  const {setFCMToken,FCMToken} = props;

  useEffect(() => {
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function(token) {
          //Todo call the post registration api endpoint
          // console.log("TOKEN:", token);
          if(FCMToken!==token){
            setFCMToken(token);
          }
        },
      
        // (required) Called when a remote or local notification is opened or received
        onNotification: function(notification) {
          // console.log("NOTIFICATION:", notification);
          // process the notification here
          notification.foreground(false); // BOOLEAN: If the notification was received in foreground or not
          notification.userInteraction(false); // BOOLEAN: If the notification was opened by the user from the notification area or not
          notification.message('My Notification Message'); // STRING: The notification message
          notification.data({}); // OBJECT: The push data or the defined userInfo in local notifications
          // required on iOS only 
          // notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
  
        // Android only
        senderID: "1090501687137",
        // iOS only
        permissions: {
          alert: true,
          badge: true,
          sound: true
        },
        popInitialNotification: true,
        requestPermissions: true
      });
  },[])

  return null
}

export default PushController;