import { StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image } from 'react-native'
import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Icon, SearchBar} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { getMenu } from '../storages/actions/menu';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Search() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchMenu, setSearchMenu] = useState('');
  const [recipes, setRecipes] = useState(null);
  const {getMenuReducers} = useSelector(state => state);
  const {data, isSuccess} = getMenuReducers;
  const [menuData, setMenuData] = useState([]);
  const login = useSelector((state) => state.login);
  const [currentPage, setCurrentPage] = useState(1);
  const [focusedItem, setFocusedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categoryCounts, setCategoryCounts] = useState({});
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const itemsPerPage = 5;

  const Items = ({
    id,
    photo,
    title,
    category,
    navigation,
    author,
  }) => {
    return (
      <ScrollView height={100}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 20,
            marginLeft: 30,
          }}>
          <Image
            onPress={() => navigation.push('DetailMenu', {itemId: id})}
            style={{height: 100, width: 100, borderRadius: 10}}
            source={{uri: photo}}
          />
          <View
            style={{
              flexDirection: 'column',
              height: '100%',
              marginLeft: 10,
            }}>
            <Text
              onPress={() => navigation.push('DetailMenu', {itemId: id})}
              style={{fontSize: 16, fontWeight: 'bold',color:'black'}}>
              {title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                
              }}>
              <Text style={{color:'black'}}>{category}</Text>
            
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
             
              <Text style={{marginLeft: 5,color:'black'}}>{author}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  const getMenu = () => 
    async dispatch => {
       
        try{
            const baseURL = 'https://kind-blue-sheep-boot.cyclic.app/';
            const token = await AsyncStorage.getItem('token');
            console.log('result')
            console.log(token)
            if (!token) {
              throw new Error('Token not found in AsyncStorage');
            }
        
            const headers = {
              Authorization: `Bearer ${login.data.token}`,
            };

            dispatch({ type: "GET_MENU_REQUEST" });
            const response = await axios.get(`${baseURL}/recipe/detail`,headers);
            if (response.data && response.data.message) {
                dispatch({type: 'GET_MENU_SUCCESS', payload: response.data});
                console.log('Success');
              } else {
                console.log('Invalid response data:', response.data);
              }
        } catch(err){
            console.log("error")
            dispatch({payload:err.response,type:"GET_MENU_FAILED"})
            console.log(err)
        }
    }

  

  useEffect(() => {
    dispatch(getMenu());
  }, []);

  const filterAndPaginateRecipes = (searchText, page) => {
    let filteredData = allRecipes;

    if (searchText) {
      filteredData = filteredData.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    if (selectedCategory !== 'All') {
      filteredData = filteredData.filter(
        item => item.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    setRecipes(paginatedData);
    setCurrentData(paginatedData);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);

      if (selectedCategory === 'All') {
        const startIndex = (currentPage - 2) * itemsPerPage;
        const endIndex = (currentPage - 1) * itemsPerPage;
        const previousData = allRecipes.slice(startIndex, endIndex);
        setRecipes(previousData);
        setCurrentData(previousData);
      } else {
        const startIndex = (currentPage - 2) * itemsPerPage;
        const endIndex = (currentPage - 1) * itemsPerPage;
        const previousData = allRecipes
          .filter(
            item =>
              item.category.toLowerCase() === selectedCategory.toLowerCase(),
          )
          .slice(startIndex, endIndex);
        setRecipes(previousData);
        setCurrentData(previousData);
      }
    }
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(
      (searchMenu ? totalItems : allRecipes.length) / itemsPerPage,
    );
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);

      if (selectedCategory === 'All') {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = Math.min((currentPage + 1) * itemsPerPage, totalItems);
        const nextData = allRecipes.slice(startIndex, endIndex);
        setRecipes(nextData);
        setCurrentData(nextData);
      } else {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = Math.min((currentPage + 1) * itemsPerPage, totalItems);
        const nextData = allRecipes
          .filter(
            item =>
              item.category.toLowerCase() === selectedCategory.toLowerCase(),
          )
          .slice(startIndex, endIndex);
        setRecipes(nextData);
        setCurrentData(nextData);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const newData = data.data.slice(0, itemsPerPage);
      
      setRecipes(newData);

      setAllRecipes(data.data);
      setFilteredRecipes(data.data);

      const counts = data.data.reduce((acc, item) => {
        const category = item.category.toLowerCase();
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});
      setCategoryCounts(counts);
    }
  }, [isSuccess, data]);

  const handleSearchChange = text => {
    setSearchMenu(text);
    filterAndPaginateRecipes(text, 1);
  };

  const handleItemPress = id => {
    if (focusedItem === id) {
      setFocusedItem(null);
    } else {
      setFocusedItem(id);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handleItemPress(item.id)}
      style={{
        backgroundColor: focusedItem === item.id ? '#00E092' : 'white',
      }}>
        <Items
        id={item.id}
        photo={item.photo}
        title={item.title}
        category={item.category}
        navigation={navigation}
        author={item.author}
        
      />
    </TouchableOpacity>
  );

  const handleCategoryChange = category => {
    setSelectedCategory(category);

    if (category === 'All') {
      setRecipes(filteredRecipes.slice(0, itemsPerPage));
      setCurrentPage(1);
    } else {
      const filteredData = filteredRecipes.filter(
        item => item.category.toLowerCase() === category.toLowerCase(),
      );

      setRecipes(filteredData.slice(0, itemsPerPage));
      setCurrentPage(1);
    }
  };

  const filterRecipes = (searchText, category) => {
    if (!searchText) {
      if (category === 'All') {
        setRecipes(data.data.slice(0, itemsPerPage));
      } else {
        const filteredData = data.data.filter(
          item => item.category.toLowerCase() === category.toLowerCase(),
        );
        setRecipes(filteredData.slice(0, itemsPerPage));
      }
    } else {
      const filteredData = data.data.filter(
        item =>
          item.title.toLowerCase().includes(searchText.toLowerCase()) &&
          (category === 'All' ||
            item.category.toLowerCase() === category.toLowerCase()),
      );

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      setRecipes(paginatedData);
    }
  };

  const countFilteredItems = () => {
    let filteredData = filteredRecipes;
    if (searchMenu) {
      filteredData = filteredData.filter(item =>
        item.title.toLowerCase().includes(searchMenu.toLowerCase()),
      );
    } else if (selectedCategory !== 'All') {
      filteredData = filteredData.filter(
        item => item.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }
    return filteredData.length;
  };

  const totalItems = countFilteredItems();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  console.log(recipes);
  return (
    <View>
        <View>
        <Fumi
          label={'Search Pasta, Bread, etc'}
          iconClass={FontAwesomeIcon}
          
          iconName={'search'}
          iconColor={'#f95a25'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          value={searchMenu}
          onChangeText={handleSearchChange}
          style={{ marginVertical: 20, marginHorizontal: 20, borderRadius: 10,width:350 }}
        />
        
        <ScrollView
          style={styles.categories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'All' && styles.selectedCategoryButton,
            ]}
            onPress={() => handleCategoryChange('All')}>
            <Text style={styles.categoryButtonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'appetizer' &&
                styles.selectedCategoryButton,
            ]}
            onPress={() => handleCategoryChange('appetizer')}>
            <Text style={styles.categoryButtonText}>Appetizers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'main course' &&
                styles.selectedCategoryButton,
            ]}
            onPress={() => handleCategoryChange('main course')}>
            <Text style={styles.categoryButtonText}>Main Course</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'desert' && styles.selectedCategoryButton,
            ]}
            onPress={() => handleCategoryChange('desert')}>
            <Text style={styles.categoryButtonText}>Dessert</Text>
          </TouchableOpacity>
        </ScrollView>
        </View>
        <View style={{marginBottom: 200}}>
        <FlatList
          data={recipes}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={goToPreviousPage}
            style={[
              styles.paginationButton,
              currentPage === 1 && styles.disabledPaginationButton,
            ]}
            disabled={currentPage === 1}>
            <Icon type="feather" name="chevron-left" size={30} color="white" />
          </TouchableOpacity>
          <Text style={{color:'black'}}>{`${Math.min(
            (currentPage - 1) * itemsPerPage + 1,
            totalItems,
          )}-${Math.min(
            currentPage * itemsPerPage,
            totalItems,
          )} of ${totalItems}`}</Text>
          <TouchableOpacity
          iconClass={FontAwesomeIcon}
          iconName={'search'}
          iconColor={'#f95a25'}
          iconSize={20}
          iconWidth={40}
            onPress={goToNextPage}
            style={[
              styles.paginationButton,
              currentPage * itemsPerPage >= totalItems &&
                styles.disabledPaginationButton,
            ]}
            disabled={currentPage * itemsPerPage >= totalItems}>
            <Icon type="feather" name="chevron-right" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
        
    </View>
  )
}
const styles = StyleSheet.create({
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 20,
      // backgroundColor: 'blue',
      marginRight: 20,
    },
  
    paginationButton: {
      backgroundColor: '#EFC81A',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginHorizontal: 15,
      padding: 5,
    },
  
    disabledPaginationButton: {
      backgroundColor: '#ccc',
    },
  
    categories: {
      flexDirection: 'row',
      marginHorizontal: 30,
      marginTop: 10,
      marginBottom: 10,
    },
  
    categoryButton: {
      backgroundColor: '#F5F5F5',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      marginRight: 10,
    },
  
    selectedCategoryButton: {
      backgroundColor: '#00E092',
    },
  
    categoryButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
  });