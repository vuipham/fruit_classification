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
  const apiIp = "192.168.2.41";
  const apiPort = "8888";
  // set state cho du lieu anh duoc chon
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  // call to Python API ----------------------------------------------------------- START

  const [response, setResponse] = useState();
  // const [isLoading, setIsLoading] = useState(true);
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

  // call to Python API ----------------------------------------------------------- END

  // Chon anh tu thu vien
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      console.log("LIBRARY -- OK ----------->");
      await setImage(result.assets[0].uri);
      await setImageBase64(result.assets[0].base64);
      // await setIsLoading(false);
    } else {
      console.log("LIBRARY -- CANCEL ----------->");
    }
  };

  // Chup anh tu camera
  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      console.log("CAMERA -- OK ----------->");
      await setImage(result.assets[0].uri);
      await setImageBase64(result.assets[0].base64);
    } else {
      console.log("CAMERA -- CANCEL ----------->");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.choose_image}>
        {/* Anh hien thi */}
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
          {/* Nut Library */}
          <TouchableOpacity
            onPress={() => pickImage()}
            style={styles.button_library}
          >
            <Text style={styles.text_library}>Library </Text>
          </TouchableOpacity>

          {/* Nut Camera */}
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

      {/* Ket qua nhan dang */}
      {response && (
        <View style={styles.data_view_fruit_name}>
          {/* Ten trai cay */}
          <Text style={styles.text_fruit_name}>
            {vitaminData[response].name}{" "}
          </Text>
        </View>
      )}
      {response ? (
        <ScrollView style={styles.data_view}>
          {/* Thong tin Vitamin */}
          <Text style={styles.text_vitamin}>• Vitamin content in 100g </Text>
          <Text style={styles.text_vitamin}>
            (μg = microgam • mg = miligam){" "}
          </Text>
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

          {/* Mo ta trai cay */}
          <Text style={styles.text_describe}>
            • Describe: {vitaminData[response].meta}{" "}
          </Text>
          <Text></Text>

          {/* Xac thuc nguon thong tin tu USDA */}
          <Text style={{ color: "#00005C" }}>Reference data from USDA</Text>
          <Text></Text>
          <Text></Text>
        </ScrollView>
      ) : (
        <View style={styles.welcome_view}>
          {/* Hien thi khi start app */}
          <Text style={styles.text_welcome}>
            {"Tips: Choose an fruit image from Library or Camera for detect"}
          </Text>
        </View>
      )}
    </View>
  );
};

export default AddImage;
