import React, { Component } from 'react';
import AppScreen from './src/components/AppScreen'
import DiaryDatabase from './src/DiaryDatabase'
import { toastMessage } from './src/Utilities';

const db = new DiaryDatabase('my-diary');

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentScreen: 'home',
      previousScreen: 'home',
      user: { id: 1 },
      diary: { edit: false },
      diaries: []
    }

    this.goTo = this.goTo.bind(this);
    this.goBack = this.goBack.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.getMethods = this.getMethods.bind(this);
    this.insertDiary = this.insertDiary.bind(this);
    this.updateDiary = this.updateDiary.bind(this);
    this.setDiary = this.setDiary.bind(this);
    this.editDiary = this.editDiary.bind(this);
    this.deleteDiary = this.deleteDiary.bind(this);
    
  }

  async componentDidMount() {
    try {

      await db.initialize();

      const user = await db.fetchUser(1);
      const diaries = await db.fetchDiaries();
    
      this.setState({ user, diaries })
    } catch (error) {
      console.log(error.message)
    }
  }



  goTo(name, callback = () => console.log('Screen changed')) {
    this.setState((state) => {
      const { currentScreen } = state;
    
      return {
        currentScreen: name,
        previousScreen: currentScreen
      }
    }, callback)
  }

  goBack() {
    this.setState((state) => {
      const { previousScreen } = state;

      return {
        currentScreen: previousScreen,
        previousScreen: 'home'
      }
    })
  }

  editDiary(bool) {
    this.setState(state => {
      const { diary } = state
      diary.edit = bool;

      return {
        diary
      }
    })
  }


  setDiary(diary, callback) {
    this.setState({ diary }, callback)
  }

  async updateUser(user, callback) {
    try {
      console.log(user)
      const rowsAffected = await db.updateUser(user)

      this.setState({ user }, () => callback(rowsAffected))
    } catch (error) {
      console.log(error.message)
    }
  }

  async insertDiary(diary, callback) {
    try {
      const insertId = await db.insertDiary(diary)
      diary.id = insertId;

      this.setState((state) => {
        const { diaries } = state;

        diaries.push(diary)
        diaries.sort((a, b) => {
          return (Date.parse(b.date) - Date.parse(a.date))
        })
        return {
          diaries
        }
      },
        () => callback(insertId)
      )
    } catch (error) {
      console.log(error.message)
    }
  }

  async updateDiary(diary, callback) {
    try {
      const rowsAffected = await db.updateDiary(diary)

      

      this.setState((state) => {
        const { diaries } = state;
        const index = diaries.findIndex(item => item.id == diary.id)
        diaries.splice(index, 1, diary);

        return{
          diaries
        }
      },
        () => callback(rowsAffected)
      )
    } catch (error) {
      toastMessage(error.message)
    }
  }

  async deleteDiary(id, callback) {
    try {
      const rowsAffected = await db.deleteDiary(id)

      this.setState((state) => {
        const { diaries } = state;
        const index = diaries.findIndex(item => item.id == id)
        diaries.splice(index, 1);

        return{
          diaries
        }
      },
        () => callback(rowsAffected)
      )
    } catch (error) {
      toastMessage(error.message)
    }
  }

  getMethods() {
    const {
      goTo,
      updateUser,
      insertDiary,
      setDiary,
      goBack,
      editDiary,
      updateDiary,
      deleteDiary
    } = this;

    return {
      goTo,
      updateUser,
      insertDiary,
      setDiary,
      goBack,
      editDiary,
      updateDiary,
      deleteDiary
    };
  }

  render() {
    return (
      <AppScreen
        state={this.state}
        methods={this.getMethods()} />
    )

  }
}

