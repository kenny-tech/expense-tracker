import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog, { SlideAnimation, DialogContent, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';

import TransactionText from '../components/TransactionText';
import TransactionFilter from '../components/TransactionFilter';
import styles from '../styles/style';
import FormView from '../components/FormView';
import Myselectinput from '../components/Myselectinput';
import { DB } from '../model/db';
import DateRange from '../components/DateRange';

const Transactions = ({ navigation }) => {

    const [visible, setVisible] = useState(false);
    const [filterTypes, setFilterTypes] = useState([]);
    const [filterBy, setFilterBy] = useState('This Month');
    const [showDateRange, setShowDateRange] = useState(false);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [filter, setFilter] = useState(false);

    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => setVisible(true)}>
                <Icon name="filter" size={30} style={styles.check}/>
            </TouchableOpacity>            
          ),
        });
    }, [navigation]);

    useEffect(() => {
        getFilterTypes();
        maximumDate();
    }, []);    

    const getFilterTypes = () => {
        DB.transaction(tx => {
            tx.executeSql('SELECT rowid, name FROM filtertypes', [], (tx, results) => {
                let filters = [];
                console.log('Filter types from report screen: ',results.rows);
                for (let i = 0; i < results.rows.length; ++i) {
                    filters.push(results.rows.item(i));
                }
                setFilterTypes(filters);
            })
        });
    }

    const maximumDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd; 
        setMaxDate(today);
    }

    const handleFilterBy = (filter_by) => { 
        if(filter_by == 'Date Range') {
            setShowDateRange(true);
            // filter_by = `${dateFrom} - ${dateTo}`;
        } else {
            setShowDateRange(false);
        }
        setFilterBy(filter_by);
    }

    const handleFilterTransaction = () => {
        if(filterBy == 'Date Range') {
            let filter_by = `${dateFrom} - ${dateTo}`;
            setFilterBy(filter_by);
        } 
        setVisible(false);
        setFilter(true);
    }

    return (
        <View style={styles.transactionView}>
            {
                filter? (<TransactionFilter filterBy={filterBy}/>) : (<TransactionText/>)
            }
            <TransactionText/>
            <Dialog
                visible={visible}
                dialogTitle={<DialogTitle title="Filter Transaction" />}
                dialogAnimation={new SlideAnimation({
                    slideFrom: 'bottom',
                })}
                onTouchOutside={() => {
                    setVisible(false)
                }}
                footer={
                    <DialogFooter>
                      <DialogButton
                        text="CANCEL"
                        onPress={() => setVisible(false)}
                      />
                      <DialogButton
                        text="OK"
                        onPress={() => handleFilterTransaction()}
                      />
                    </DialogFooter>
                }
            >
                <DialogContent>
                    <View>
                        <FormView 
                            label="Filter by"
                            inputType={<Myselectinput types={filterTypes} 
                            defaultValue={filterBy}
                            onValueChange={(filter_by) => handleFilterBy(filter_by)}/>}
                        />
                        {
                            showDateRange ? (
                                <View 
                                    style={{flexDirection: 'row', justifyContent: 'flex-start', width: 380,
                                    height: 70,
                                    backgroundColor: '#ffffff',
                                    marginTop: 5,
                                    marginHorizontal: 10}}
                                >
                                    <DateRange defaultDate={dateFrom} onDateChange={(dateFrom) => {setDateFrom(dateFrom)}} label="From" maxDate={maxDate}/>
                                    <DateRange defaultDate={dateTo} onDateChange={(dateTo) => {setDateTo(dateTo)}} label="To" maxDate={maxDate}/>
                                </View>
                            ) : null
                        }
                    </View>
                </DialogContent>
            </Dialog>
        </View>
    )
}

export default Transactions;