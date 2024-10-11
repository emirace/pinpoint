// ActiveLeadsCard.tsx
import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Card, Avatar, List, Text, useTheme } from "react-native-paper";
import Button from "../../Button";

const leads = [
  {
    id: "1",
    name: "Cody Dixon",
    service: "Service Name",
    time: "1 min ago",
    location: "Location Name",
  },
  {
    id: "2",
    name: "Cody Dixon",
    service: "Service Name",
    time: "5 min ago",
    location: "Location Name",
  },
  // Add more items if needed to test scrolling
];

const ActiveLeadsCard: React.FC = () => {
  const { colors } = useTheme();
  return (
    <Card style={styles.card}>
      <Card.Title
        title="Active Leads"
        right={() => <Text style={styles.viewAll}>VIEW ALL</Text>}
        titleStyle={{ fontWeight: "bold" }}
      />
      <Card.Content>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        >
          {leads.map((lead) => (
            <View key={lead.id} style={styles.listItem}>
              <List.Item
                title={lead.name}
                description={`${lead.service} `}
                left={() => (
                  <Avatar.Image
                    size={40}
                    source={{ uri: "https://via.placeholder.com/40" }}
                  />
                )}
                right={() => <Text style={styles.time}>{lead.time}</Text>}
                // style={styles.listItem}
              />
              <Button
                variant="outlined"
                containerStyle={{ paddingVertical: 8, borderWidth: 0 }}
                textStyle={{ color: colors.primary }}
              >
                Complete
              </Button>
            </View>
          ))}
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: "white",
    flex: 1,
  },
  viewAll: {
    color: "#007AFF",
    marginRight: 10,
    fontSize: 14,
  },
  listItem: {
    paddingVertical: 5,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0", // Adds a light separator line for better visual distinction on web
  },
  time: {
    fontSize: 12,
    color: "#999",
    alignSelf: "center",
  },
});

export default ActiveLeadsCard;