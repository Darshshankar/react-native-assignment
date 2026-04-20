import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

type Account = {
  product: string;
  interest: number;
  minimum: number;
  type: string;
};

export default function App() {
  const [data, setData] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();

  useEffect(() => {
    fetch("https://srest.com/accounts.json")
      .then((res) => res.json())
      .then((json: Account[]) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#008c85" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Savings Products</Text>
      <Text style={styles.subHeader}>Choose the best option</Text>

      {width > 600 ? (
        <TableView data={data} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <Card item={item} />}
        />
      )}
    </View>
  );
}

// 🔹 CARD COMPONENT
const Card = ({ item }: { item: Account }) => {
  const getColor = (type: string) => {
    switch (type) {
      case "Fixed":
        return "#4A90E2";
      case "Tracker":
        return "#27AE60";
      default:
        return "#8E44AD";
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { borderLeftColor: getColor(item.type) },
        { opacity: pressed ? 0.9 : 1 },
      ]}
    >
      <Text style={styles.title}>{item.product}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>💰 Interest</Text>
        <Text style={styles.value}>{item.interest}%</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>📉 Minimum</Text>
        <Text style={styles.value}>
          ₹{item.minimum ?? 500}
        </Text>
      </View>

      <View style={styles.tag}>
        <Text style={styles.tagText}>{item.type}</Text>
      </View>
    </Pressable>
  );
};

// 🔹 TABLE VIEW (for large screens)
const TableView = ({ data }: { data: Account[] }) => {
  return (
    <View>
      <View style={styles.tableHeader}>
        <Text style={styles.th}>Product</Text>
        <Text style={styles.th}>Interest</Text>
        <Text style={styles.th}>Minimum</Text>
        <Text style={styles.th}>Type</Text>
      </View>

      {data.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.td}>{item.product}</Text>
          <Text style={styles.td}>{item.interest}%</Text>
          <Text style={styles.td}>₹{item.minimum}</Text>
          <Text style={styles.td}>{item.type}</Text>
        </View>
      ))}
    </View>
  );
};

// 🎨 STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F7FA",
  },

  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#008c85",
  },

  subHeader: {
    fontSize: 14,
    color: "#777",
    marginBottom: 15,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // CARD
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderLeftWidth: 6,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  label: {
    color: "#666",
    fontSize: 14,
  },

  value: {
    fontWeight: "600",
    fontSize: 14,
  },

  tag: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#f1f3f5",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },

  tagText: {
    fontSize: 12,
    fontWeight: "500",
  },

  // TABLE
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    paddingBottom: 10,
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },

  th: {
    flex: 1,
    fontWeight: "bold",
  },

  td: {
    flex: 1,
  },
});