import React,{useState} from 'react'
import { ScrollView, View ,Text} from 'react-native'

const EditPost = ({route}) => {
    const {postId} = route.params

    return(
        <ScrollView>
            <View>
                <Text>
                    {postId}
                </Text>
            </View>
        </ScrollView>
    )
}

export default EditPost