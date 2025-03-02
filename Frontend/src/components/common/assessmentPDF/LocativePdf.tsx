import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { Locative } from "@/types/DataProps"; // Assuming Locative type is defined in DataProps
import pfp from "@/assets/avatar-default.png"; // You can adjust if necessary

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2c3e50",
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#34495e",
    borderBottom: "1px solid #ddd",
    paddingBottom: 5,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    color: "#2c3e50",
  },
  textGroup: {
    marginBottom: 8,
  },
  textItem: {
    lineHeight: 1.5,
  },
  photoBox: {
    width: 100,
    height: 100,
    border: "1px solid #ccc",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginBottom: 10,
    borderRadius: 8,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

const renderField = (label: string, value?: string | number | boolean) =>
  value ? (
    <View style={styles.textGroup}>
      <Text style={styles.label}>{label}: </Text>
      <Text style={styles.textItem}>{value}</Text>
    </View>
  ) : null;

interface Props {
  locative?: Locative;
}

export const LocativePdfComponent = ({ locative }: Props) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>LOCATIVE INFORMATION</Text>

      {/* Locative Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>I - LOCATIVE DETAILS</Text>
        {renderField("Door Number", locative?.door_number)}
        {renderField("Rental Type", locative?.rental_type)}
        {renderField("Rent", locative?.rent)}
        {renderField("Charges", locative?.charges)}
        {renderField("Room", locative?.room)}
        {renderField("Area (m²)", locative?.area)}
        {renderField("Created At", locative?.created_at)}
        {renderField("Updated At", locative?.updated_at)}
      </View>
    </Page>
  </Document>
);
