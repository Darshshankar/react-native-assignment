import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Product = {
  product: string;
  interest: number;
  minimum: number;
  type: string;
};

export default function Index() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("https://srest.com/accounts.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const nextProduct = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevProduct = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const item = data[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Savings</Text>
      <Text style={styles.heading}>accounts</Text>

      {/* Product Card */}
      <View style={styles.card}>
        <Text style={styles.row}>{item.product}</Text>
        <Text style={styles.row}>{item.interest.toFixed(2)}%</Text>
        <Text style={styles.row}>Minimum deposit £{item.minimum}</Text>
        <Text style={styles.row}>Interest type: {item.type}</Text>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={prevProduct}>
          <Text style={styles.navText}>
            {currentIndex > 0 ? `< ${data[currentIndex - 1].product}` : ""}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={(nextProduct)}>
        <Text style={styles.navText}>
          {currentIndex < data.length -1 
          ? `${data[currentIndex + 1].product} >` :""}
        </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#ffffffff",
    padding: 20,
  },

 heading:{
  fontSize:42,
  fontWeight: "300",
  color: "#333",
  lineHeight: 48,
 },
 card:{
  marginTop: 30,
  borderWidth: 1,
  borderColor: "#000",
 },
 row:{
  borderBottomWidth: 1,
  borderColor:"#000",
  textAlign: "center",
  paddingVertical: 12,
  fontSize: 18,
 },
 bottomNav:{
marginTop: 20,
flexDirection: "row",
justifyContent: "space-between",

 },
 navText: {
  fontSize: 16,
  color:"#000",
  textDecorationLine: "underline",

},
loader: {
  flex:1,
  justifyContent: "center",
  alignItems: "center",
},
});

        