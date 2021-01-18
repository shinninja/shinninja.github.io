<<template>
    <div id="app">
        <div class="container">
            <div class="form-group">
                <button @click="fetchContacts">1페이지 연락처 조회</button>
            </div>

            <div class="form-group">
                <input type="text" v-model="name" placeholder="이름을 입락합니다.">
                <input type="text" v-model="tel" placeholder="전화번호를 입력합니다.">
                <input type="text" v-model="address" placeholder="주소를 입력합니다.">
                <button @click="addContact"></button>
            </div>

            <div class="form-group">
                <input type="text" v-model="no">
                <button @click="fetchContactOne">연락처 1건 조회</button>
            </div>

            <div class="form-group">
                <input type="text" v-model="no">
                <input type="text" v-model="name" placeholder="이름을 입력합니다.">
                <input type="tett" v-model="tel" placeholder="전화번호를 입력합니다.">
                <input type="text" v-model="address" placeholder="주소를 입력합니다.">
                <button @click="updateContact">수정</button>
            </div>

            <div class="form-group">
                <input type="text" v-model="no">
                <button @click="deleteContact">삭제</button>
            </div>

            <div class="form-group">
                <input type="text" v-model="no">
                <input type="file" ref="photofile" name="photo">
                <button @click="changePhoto">파일 변경</button>
            </div>

            <span>JSON 출력</span>
            <div id="result" class="container">
                <xmp>{{ result }}</xmp>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name=" 'app",
    data(){
        return {
            no:0, name:'', tel:'', address:'',
            result: null
        }
    },
    methods: {
        fetchContacts : function(){

        },
        addContact : function(){

        },
        fetchContactOne : function(){

        },
        updateContact: function(){

        },
        deleteContact: function(){

        },
        changePhoto: function(){

        }
    }
}
</script>

<style>
    @import url('https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css');
    #app {
        font-family:'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothig: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align:center;
        color:#2c3e50;
        margin-top:60px;
    }
    .container {border:solid 1px gray;padding:10px;margin-bottom:10px;text-align:left;}
    #result {text-align:left;padding:20px;border:solid 1px #000;}
    .form-group {border:dashed 1px gray;padding:5px 5px 5px 20px;}
</style>
AppAxiosTest.vue