import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Owner } from "@/types/DataProps";
import pfp from "@/assets/avatar-default.png";

interface Props {
  owner: Owner;
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

export const OwnerPdfComponent = ({ owner }: Props) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Image
          src={
            owner.is_business_owner
              ? owner.business_photo
              : owner.private_photo || pfp
          }
          style={styles.logo}
        />
        <Text style={styles.title}>OWNER INFORMATION</Text>
      </View>

      {/* Identification Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>I - OWNER IDENTIFICATION</Text>
        {owner.is_business_owner ? (
          <>
            {renderField("Company Name", owner.business_company_name)}
            {renderField("Manager Name", owner.business_manager_name)}
            {renderField("Gender", owner.business_manager_gender)}
            {renderField("Date of Birth", owner.business_manager_date_of_birth)}
            {renderField(
              "Place of Birth",
              owner.business_manager_place_of_birth
            )}
            {renderField(
              "Document Number",
              owner.business_manager_document_number
            )}
            {renderField("Expiry Date", owner.business_manager_expiry_date)}
            {renderField("Job Position", owner.business_manager_job_position)}
          </>
        ) : (
          <>
            {renderField("Name", `${owner.private_name} ${owner.surname}`)}
            {renderField("Gender", owner.private_gender)}
            {renderField("Date of Birth", owner.private_birth_date)}
            {renderField("Place of Birth", owner.private_place_of_birth)}
            {renderField("Nationality", owner.private_nationality)}
            {renderField("Document Type", owner.private_document_type)}
            {renderField("Document Number", owner.private_document_number)}
            {renderField("Expiry Date", owner.private_expiry_date)}
            {renderField("Occupation", owner.private_occupation)}
          </>
        )}
      </View>

      {/* Contact Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>II - CONTACT INFORMATION</Text>
        {owner.is_business_owner ? (
          <>
            {renderField("Office Phone", owner.business_office_phone_number)}
            {renderField("WhatsApp Contact", owner.business_whatsapp_contact)}
            {renderField("Email", owner.business_email)}
            {renderField("Head Office Address", owner.business_head_office)}
          </>
        ) : (
          <>
            {renderField("Contact Number", owner.private_contact)}
            {renderField("WhatsApp", owner.private_whatsapp_contact)}
            {renderField("Email", owner.private_email)}
            {renderField("PO Box", owner.private_po_box)}
            {renderField("Marital Status", owner.private_marital_status)}
            {renderField("Spouse's Name", owner.private_spouses_name)}
          </>
        )}
      </View>

      {/* Emergency Contact Section */}
      {!owner.is_business_owner && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            III - EMERGENCY CONTACT INFORMATION
          </Text>
          {renderField("Contact Name", owner.private_emergency_contact_name)}
          {renderField("Contact Number", owner.private_emergency_contact)}
          {renderField(
            "Relationship",
            owner.private_emergency_contact_relation
          )}
        </View>
      )}
    </Page>
  </Document>
);
