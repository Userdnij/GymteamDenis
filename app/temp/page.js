"use client"

import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import MyDocument from '../../components/MyDocument/MyDocument';
import { useEffect, useState} from "react";

export default function Temp() {

  return (
    <PDFViewer width="100%" height="1000">
      <MyDocument />
    </PDFViewer>
  );
}