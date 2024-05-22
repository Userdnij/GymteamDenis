import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
    family: 'Roboto',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf'
  });

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  content: {
    margin: 10,
    padding: 10,
    flexDirection: 'column',
    width: '100%'
  },
  section: {
  },
  sectionCenter: {
    marginTop: 100,
    alignItems: 'center'
  },
  rowFull: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingRight: 10,
  },
  row: {
    marginTop: 100,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingRight: 10,
    gap: 10
  },
  textThin: {
    fontSize: 16,
  },
});

// Create Document Component
const MyDocument = ({price, product, term, trenerTalr, trener}) => {
    const currentDate = new Date().toISOString().split('T')[0];

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.content}>
                    <View style={styles.rowFull}>
                        <View style={styles.section}>
                            <Text>GymTeam</Text>
                        </View>
                        <View>
                            <Text>Reķins #123</Text>
                            <Text>Datums: {currentDate}</Text>
                        </View>
                    </View>

                    <View style={styles.sectionCenter}>
                        <Text>Paldies par pirkumu!</Text>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.section}>
                            <Text>Produkts:</Text>
                            {term && <Text>Termiņš:</Text>}
                            {trener && <Text>Treneris:</Text>}
                            {trenerTalr && <Text>Trenera talrunis:</Text>}
                            <Text>Cena:</Text>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.textThin}>{product}</Text>
                            {term && <Text>{term} meneši</Text>}
                            {trener && <Text>{trener}</Text>}
                            {trenerTalr && <Text>{trenerTalr}</Text>}
                            <Text style={styles.textThin}>{price} EUR</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default MyDocument;