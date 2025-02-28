import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { Client } from "@/types/DataProps";
import pfp from "@/assets/avatar-default.png";

interface Props {
  client?: Client;
}

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
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  textGroup: {
    marginBottom: 8,
  },
  textItem: {
    lineHeight: 1.5,
  },
});

const renderField = (label: string, value?: string | number) =>
  value ? (
    <View style={styles.textGroup}>
      <Text style={styles.label}>{label}: </Text>
      <Text style={styles.textItem}>{value}</Text>
    </View>
  ) : null;

export const ClientPdfComponent = ({ client }: Props) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Image
          src={(client?.is_business_client? client?.business_photo: client?.private_photo)|| pfp
          }
          style={styles.logo}
        />
        <Text style={styles.title}>CLIENT INFORMATION</Text>
      </View>

      {/* Identification Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>I - CLIENT IDENTIFICATION</Text>
        {client?.is_business_client ? (
          <>
            {renderField("Company Name", client?.business_company_name)}
            {renderField("Business Registration Number", client?.business_business_registration_number)}
            {renderField("Industry Sector", client?.business_industry_sector)}
            {renderField("Taxpayer Identification Number", client?.business_taxpayer_identification_number)}
            {renderField("Manager Name", client?.business_manager_name)}
            {renderField("Manager Gender", client?.business_manager_gender)}
            {renderField("Manager Date of Birth", client?.business_manager_date_of_birth)}
            {renderField("Manager Place of Birth", client?.business_manager_place_of_birth)}
            {renderField("Manager Document Number", client?.business_manager_document_number)}
            {renderField("Manager Expiry Date", client?.business_manager_expiry_date)}
          </>
        ) : (
          <>
            {renderField("Name", `${client?.private_name} ${client?.surname}`)}
            {renderField("Gender", client?.private_gender)}
            {renderField("Date of Birth", client?.private_birth_date)}
            {renderField("Place of Birth", client?.private_place_of_birth)}
            {renderField("Nationality", client?.private_nationality)}
            {renderField("Document Type", client?.private_document_type)}
            {renderField("Document Number", client?.private_document_number)}
            {renderField("Expiry Date", client?.private_expiry_date)}
            {renderField("Occupation", client?.private_occupation)}
          </>
        )}
      </View>

      {/* Contact Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>II - CONTACT INFORMATION</Text>
        {client?.is_business_client ? (
          <>
            {renderField("Office Phone", client?.business_office_phone_number)}
            {renderField("WhatsApp Contact", client?.business_whatsapp_contact)}
            {renderField("Email", client?.business_email)}
            {renderField("Head Office Address", client?.business_head_office)}
          </>
        ) : (
          <>
            {renderField("Contact Number", client?.private_contact)}
            {renderField("WhatsApp", client?.private_whatsapp_contact)}
            {renderField("Email", client?.private_email)}
            {renderField("Mail Box", client?.private_mail_box)}
            {renderField("Marital Status", client?.private_marital_status)}
            {renderField("Spouse's Name", client?.private_spouses_name)}
          </>
        )}
      </View>

      {/* Emergency Contact Section */}
      {!client?.is_business_client && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>III - EMERGENCY CONTACT INFORMATION</Text>
          {renderField("Emergency Contact Name", client?.private_emergency_contact_name)}
          {renderField("Emergency Contact Number", client?.private_emergency_contact)}
          {renderField("Relationship", client?.private_emergency_contact_relation)}
        </View>
      )}
    </Page>
  </Document>
);
