import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Mandate } from "@/types/DataProps"; // Assuming the Mandate type is defined in DataProps

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
});

const renderField = (label: string, value?: string | number | boolean) =>
  value ? (
    <View style={styles.textGroup}>
      <Text style={styles.label}>{label}: </Text>
      <Text style={styles.textItem}>{value}</Text>
    </View>
  ) : null;

interface Props {
  mandate?: Mandate;
}

export const MandatePdfComponent = ({ mandate }: Props) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>MANDATE INFORMATION</Text>

      {/* Mandate Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>I - MANDATE DETAILS</Text>
        {renderField("Mandate Type", mandate?.type_of_mandate)}
        {renderField("Owner Name", mandate?.owner_name)}
        {renderField("Concerned Property", mandate?.very_concerned ? "Yes" : "No")}
        {renderField("Property Type", mandate?.type_of_property)}
        {renderField("Neighborhood", mandate?.neighborhood)}
        {renderField("Tax Payable", mandate?.tax_payable ? "Yes" : "No")}
        {renderField("Billing Type", mandate?.billing_type)}
        {renderField("Commission", mandate?.commission)}
        {renderField("Commission Percentage", mandate?.commission_percentage)}
        {renderField("Deduct Commission", mandate?.deduct_commission ? "Yes" : "No")}
        {renderField("VAT on Commission", mandate?.vat_on_commission ? "Yes" : "No")}
        {renderField("Date of Signature", mandate?.date_of_signature)}
        {renderField("Debut Date", mandate?.debut_date)}
        {renderField("End Date", mandate?.end_date)}
        {renderField("Digital Signature", mandate?.digital_signature_of_the_mandate)}
        {renderField("Tacit Renewal", mandate?.tacit_renewal ? "Yes" : "No")}
        {renderField("Status", mandate?.status)}
        {renderField("Created At", mandate?.created_at)}
      </View>
    </Page>
  </Document>
);
