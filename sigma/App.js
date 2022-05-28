import React, { Fragment, useEffect } from 'react';
import PushController from './PushController';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import PushNotification from "react-native-push-notification";
// Dummy data for list, we'll replace this with data received from push




let pushData = [
  {
    title: "First push",
    message: "First push message"
  },
  {
    title: "Second push",
    message: "Second push message"
  }
]




// _renderItem = ({ item }) => (
//   <TouchableOpacity
//     onPress={() => handleNotification()}
//   >
//     <View key={item.title}>
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.message}>{item.message}</Text>
//     </View>
//   </TouchableOpacity>

// );




const App = () => {

  useEffect(() => {
    createChannels();

  }, [])

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "default",
        channelName: "Default",
        // sound: true,
        // vibrate: true,
      }
    )
  }

  const handleNotification = (item) => {
    PushNotification.localNotification({
      channelId: "default",
      title: "you clicked on " + item.title,
      message: item.message,
      bigText: "You have entered the tomb of the ancient king",
    })

    PushNotification.localNotificationSchedule({
      channelId: "default",
      title: "you clicked on " + item.title + " sometime ago", 
      message: item.message,
      date: new Date(Date.now() + (30 * 1000));
      allowWhileIdle: true,
    })

  }

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={styles.listHeader}>
            <Text>Push Notifications</Text>
          </View>
          <View style={styles.body}>
            <FlatList
              data={pushData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleNotification(item)}
                >
                  <View key={item.title}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.message}>{item.message}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.title}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <PushController />
    </Fragment>
  );
};
const styles = StyleSheet.create({
  scrollView: { backgroundColor: Colors.lighter, },
  listHeader: { backgroundColor: '#eee', color: "#222", height: 44, padding: 12 },
  title: { fontSize: 18, fontWeight: 'bold', paddingTop: 10 },
  message: { fontSize: 14, paddingBottom: 15, borderBottomColor: "#ccc", borderBottomWidth: 1 },
  engine: { position: 'absolute', right: 0, },
  body: { backgroundColor: Colors.white, paddingHorizontal: 20, paddingVertical: 10, },
  sectionContainer: { marginTop: 32, paddingHorizontal: 24, },
  sectionTitle: { fontSize: 24, fontWeight: '600', color: Colors.black },
  sectionDescription: { marginTop: 8, fontSize: 18, fontWeight: '400', color: Colors.dark, },
  highlight: { fontWeight: '700' },
  footer: { color: Colors.dark, fontSize: 12, fontWeight: '600', padding: 4, paddingRight: 12, textAlign: 'right', },
});
export default App;