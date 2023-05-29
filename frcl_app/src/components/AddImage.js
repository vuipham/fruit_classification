import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import vitaminData from "../storage/fruit_data";
import styles from "../styles/add_Image_styles";

const AddImage = () => {
  const apiIp = "192.168.43.177";
  const apiPort = "8888";
  // ===== set state for selected image
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  // ===== send request to classifier api

  const [response, setResponse] = useState();
  const requestUrl = "http://" + apiIp + ":" + apiPort + "/api/classifier";

  useEffect(() => {
    async function detectFruits() {
      try {
        const res = await fetch(requestUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fruit_b64: imageBase64 }),
        });
        const json = await res.json();
        console.log("Fetch data success: ", json);
        await setResponse(json.fruit_detect);
        // await setIsLoading(false);
      } catch (error) {
        console.log("Failed to fetch: ", error);
      }
    }
    detectFruits();
  });

  // select image from library
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      console.log("LIBRARY > OK ==>");
      await setImage(result.assets[0].uri);
      await setImageBase64(result.assets[0].base64);
    } else {
      console.log("LIBRARY > CANCEL ==>");
    }
  };

  // get from camera
  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      console.log("CAMERA > OK ==>");
      await setImage(result.assets[0].uri);
      await setImageBase64(result.assets[0].base64);
    } else {
      console.log("CAMERA > CANCEL ==>");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.choose_image}>
        {/* image selected display */}
        {image && <Image source={{ uri: image }} style={styles.image} />}
        {!image && (
          <Image
            source={{
              uri: "https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png",
            }}
            style={styles.image}
          />
        )}

        <View style={styles.row}>
          {/* Library button*/}
          <TouchableOpacity
            onPress={() => pickImage()}
            style={styles.button_library}
          >
            <Text style={styles.text_library}>Library </Text>
          </TouchableOpacity>

          {/* Camera button */}
          <TouchableOpacity
            onPress={() => takePicture()}
            style={styles.button_camera}
          >
            <Text style={styles.text_camera}>Camera </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* loading...
            {isLoading === true && <ActivityIndicator size="large" color="#C060A1" />} */}

      {/* result panel */}
      {response && (
        <View style={styles.data_view_fruit_name}>
          {/* fruit name */}
          <Text style={styles.text_fruit_name}>
            {vitaminData[response].name}{" "}
          </Text>
        </View>
      )}
      {response ? (
        <ScrollView style={styles.data_view}>
          {/* fruit info */}
          {/* <Text style={styles.text_vitamin}>• Vitamin content in 100g </Text>
          <Text style={styles.text_vitamin}>
            (μg = microgam • mg = miligam){" "}
          </Text> */}
          {vitaminData[response].a > 0 && (
            <Text style={styles.text_vitamin}>
              {"   "}- Vitamin A (μg): {vitaminData[response].a}
            </Text>
          )}
          {vitaminData[response].b6 > 0 && (
            <Text style={styles.text_vitamin}>
              {"   "}- Vitamin B6 (mcg): {vitaminData[response].b6}{" "}
            </Text>
          )}
          {vitaminData[response].b12 > 0 && (
            <Text style={styles.text_vitamin}>
              {"   "}- Vitamin B12 (mg): {vitaminData[response].b12}{" "}
            </Text>
          )}
          {vitaminData[response].c > 0 && (
            <Text style={styles.text_vitamin}>
              {"   "}- Vitamin C (mg): {vitaminData[response].c}{" "}
            </Text>
          )}
          {vitaminData[response].e > 0 && (
            <Text style={styles.text_vitamin}>
              {"   "}- Vitamin E (mg): {vitaminData[response].e}{" "}
            </Text>
          )}
          {vitaminData[response].k > 0 && (
            <Text style={styles.text_vitamin}>
              {"   "}- Vitamin K (μg): {vitaminData[response].k}{" "}
            </Text>
          )}
          <Text></Text>

          {/* fruit description */}
          <Text style={styles.text_describe}>
            {vitaminData[response].meta}{" "}
          </Text>

          <Text style={styles.error}>
            {vitaminData[response].error}{" "}
          </Text>
          <Text></Text>

          {/* USDA */}
          {/* <Text style={{ color: "#00005C" }}>Reference data from USDA</Text> */}
          <Text></Text>
          <Text></Text>
        </ScrollView>
      ) : (
        <View style={styles.welcome_view}>
          {/* tips display */}
          <Text style={styles.text_welcome}>
            {"Tips: Choose an fruit image from Library or Camera for detect"}
          </Text>
        </View>
      )}
    </View>
  );
};

export default AddImage;
