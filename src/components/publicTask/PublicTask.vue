<template>
  <div class="diplomatic">
    <!-- <div class="diplomatic-cla">
      <div class="work_queue">
        <span>个人任务信息</span>
        <div class="box"></div>
      </div>
      <div class="diplomatic-cla-1">
        <div
          v-if="this.primary.registerflag === '1'"
          @click="selectItem('0000005015')"
          :class="{'colorSet': choseIndex === '0000005015', '': ''}"
        >立案({{personData.length}})</div>

        <div
          v-if="this.primary.checkflag === '1'"
          @click="selectItem('0000005035')"
          :class="{'colorSet': choseIndex === '0000005035', '': ''}"
        >审核({{personData1.length}})</div>
        <div
          v-if="this.primary.uwflag === '1'"
          @click="selectItem('0000005055')"
          :class="{'colorSet': choseIndex === '0000005055', '': ''}"
        >审批({{personData2.length}})</div>
        <div
          :class="{'colorSet': choseIndex === '0000005075', '': ''}"
          @click="selectItem('0000005075')"
        >绿色通道({{greenData.length}})</div>
      </div>
      <div class="block">
        <span style="font-size:14px;">受理日期</span>
        <el-date-picker
          @blur="blurStartData"
          v-model="startTime"
          type="date"
          size="small"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
        <span style="font-size:14px;">至</span>
        <el-date-picker
          @blur="blurEndData"
          v-model="endTime"
          type="date"
          size="small"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
        <el-button type="primary" size="small" @click="queryData">查询</el-button>
      </div>
    </div>

    <div class="work_table" v-if="choseIndex === '0000005015'">
      <el-table
        style="width: 100%"
        :data="personData.slice((currpage - 1) * pagesize, currpage * pagesize)"
        @row-dblclick="handle"
      >
        <el-table-column label="序号" align="center" type="index" width="50" :index="indexMethod"></el-table-column>
        <el-table-column prop="rgtno" align="center" label="理赔号" width="180"></el-table-column>
        <el-table-column prop="makedate" align="center" label="受理日期" width="160"></el-table-column>
        <el-table-column prop="reportchnl" align="center" label="受理渠道" width="140"></el-table-column>
        <el-table-column prop="customername" align="center" label="客户姓名" width="160"></el-table-column>
        <el-table-column prop="vipflag" align="center" label="客户标识" width="140">
          <template slot-scope="scope">
            <img
              v-for="(item,index) in scope.row.vipflag"
              :key="index"
              :src="item.url"
              :title="item.title"
              class="head_pic"
            />
          </template>
        </el-table-column>
        <el-table-column prop="salechnl" align="center" label="销售渠道" width="160"></el-table-column>
        <el-table-column prop="agentinfor" align="center" label="营销员" width="180"></el-table-column>
        <el-table-column prop="posttitle" align="center" label="营销员标识" width="160"></el-table-column>
        <el-table-column prop="clmstate" align="center" label="案件状态" width="160"></el-table-column>
        <el-table-column prop="time" align="center" label="理赔时效（天）" width="160"></el-table-column>
      </el-table>
      <div style="margin-top:10px;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pagesize"
          layout="prev, pager, next,jumper"
          :total="personData.length"
        ></el-pagination>
      </div>
    </div>
    <div class="work_table" v-else-if="choseIndex === '0000005035'">
      <el-table
        style="width: 100%"
        :data="personData1.slice((currpage1 - 1) * pagesize1, currpage1 * pagesize1)"
        @row-dblclick="handle1"
      >
        <el-table-column label="序号" align="center" type="index" width="50" :index="indexMethod1"></el-table-column>
        <el-table-column prop="rgtno" align="center" label="理赔号" width="180"></el-table-column>
        <el-table-column prop="makedate" align="center" label="受理日期" width="160"></el-table-column>
        <el-table-column prop="reportchnl" align="center" label="受理渠道" width="140"></el-table-column>
        <el-table-column prop="customername" align="center" label="客户姓名" width="160"></el-table-column>
        <el-table-column prop="vipflag" align="center" label="客户标识" width="140">
          <template slot-scope="scope">
            <img
              v-for="(item,index) in scope.row.vipflag"
              :key="index"
              :src="item.url"
              :title="item.title"
              class="head_pic"
            />
          </template>
        </el-table-column>
        <el-table-column prop="salechnl" align="center" label="销售渠道" width="160"></el-table-column>
        <el-table-column prop="agentinfor" align="center" label="营销员" width="180"></el-table-column>
        <el-table-column prop="posttitle" align="center" label="营销员标识" width="160"></el-table-column>
        <el-table-column prop="clmstate" align="center" label="案件状态" width="160"></el-table-column>
        <el-table-column prop="time" align="center" label="理赔时效（天）" width="160"></el-table-column>
      </el-table>
      <div style="margin-top:10px;">
        <el-pagination
          background
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :page-size="pagesize1"
          layout="prev, pager, next,jumper"
          :total="personData1.length"
        ></el-pagination>
      </div>
    </div>
    <div class="work_table" v-else-if="choseIndex === '0000005055'">
      <el-table
        style="width: 100%"
        :data="personData2.slice((currpage2 - 1) * pagesize2, currpage2 * pagesize2)"
        @row-dblclick="handle2"
      >
        <el-table-column label="序号" align="center" type="index" width="50" :index="indexMethod2"></el-table-column>
        <el-table-column prop="rgtno" align="center" label="理赔号" width="180"></el-table-column>
        <el-table-column prop="makedate" align="center" label="受理日期" width="160"></el-table-column>
        <el-table-column prop="reportchnl" align="center" label="受理渠道" width="140"></el-table-column>
        <el-table-column prop="customername" align="center" label="客户姓名" width="160"></el-table-column>
        <el-table-column prop="vipflag" align="center" label="客户标识" width="140">
          <template slot-scope="scope">
            <img
              v-for="(item,index) in scope.row.vipflag"
              :key="index"
              :src="item.url"
              :title="item.title"
              class="head_pic"
            />
          </template>
        </el-table-column>
        <el-table-column prop="salechnl" align="center" label="销售渠道" width="160"></el-table-column>
        <el-table-column prop="agentinfor" align="center" label="营销员" width="180"></el-table-column>
        <el-table-column prop="posttitle" align="center" label="营销员标识" width="160"></el-table-column>
        <el-table-column prop="clmstate" align="center" label="案件状态" width="160"></el-table-column>
        <el-table-column prop="time" align="center" label="理赔时效（天）" width="160"></el-table-column>
      </el-table>
      <div style="margin-top:10px;">
        <el-pagination
          background
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :page-size="pagesize2"
          layout="prev, pager, next,jumper"
          :total="personData2.length"
        ></el-pagination>
      </div>
    </div>
    <div class="work_table" v-else-if="choseIndex === '0000005075'">
      <el-table
        style="width: 100%"
        :data="greenData.slice((currpage3 - 1) * pagesize3, currpage3 * pagesize3)"
        @row-dblclick="handle3"
      >
        <el-table-column label="序号" align="center" type="index" width="50" :index="indexMethod3"></el-table-column>
        <el-table-column prop="rgtno" align="center" label="理赔号" width="180"></el-table-column>
        <el-table-column prop="makedate" align="center" label="受理日期" width="160"></el-table-column>
        <el-table-column prop="reportchnl" align="center" label="受理渠道" width="140"></el-table-column>
        <el-table-column prop="customername" align="center" label="客户姓名" width="160"></el-table-column>
        <el-table-column prop="vipflag" align="center" label="客户标识" width="140">
          <template slot-scope="scope">
            <img
              v-for="(item,index) in scope.row.vipflag"
              :key="index"
              :src="item.url"
              :title="item.title"
              class="head_pic"
            />
          </template>
        </el-table-column>
        <el-table-column prop="salechnl" align="center" label="销售渠道" width="160"></el-table-column>
        <el-table-column prop="agentinfor" align="center" label="营销员" width="180"></el-table-column>
        <el-table-column prop="posttitle" align="center" label="营销员标识" width="160"></el-table-column>
        <el-table-column prop="clmstate" align="center" label="案件状态" width="160"></el-table-column>
        <el-table-column prop="time" align="center" label="理赔时效（天）" width="160"></el-table-column>
      </el-table>
      <div style="margin-top:10px;">
        <el-pagination
          background
          @size-change="handleSizeChange3"
          @current-change="handleCurrentChange3"
          :page-size="pagesize3"
          layout="prev, pager, next,jumper"
          :total="greenData.length"
        ></el-pagination>
      </div>
    </div>-->
    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-bottom:20px;">
      <div :style="style1" :class="isbox ? 'box' : ''"></div>
      <el-tab-pane name="first" v-if="this.primary.registerflag === '1'">
        <span slot="label">立案({{personData.length}})</span>
        <el-table
          style="width: 100%"
          :data="personData.slice((currpage - 1) * pagesize, currpage * pagesize)"
          @row-dblclick="handle"
        >
          <el-table-column label="序号" align="center" type="index" width="50" :index="indexMethod"></el-table-column>
          <el-table-column prop="rgtno" align="center" label="理赔号" width="180"></el-table-column>
          <el-table-column prop="makedate" align="center" label="受理日期" width="160"></el-table-column>
          <el-table-column prop="reportchnl" align="center" label="受理渠道" width="140"></el-table-column>
          <el-table-column prop="customername" align="center" label="客户姓名" width="160"></el-table-column>
          <el-table-column prop="vipflag" align="center" label="客户标识" width="140">
            <template slot-scope="scope">
              <img
                v-for="(item,index) in scope.row.vipflag"
                :key="index"
                :src="item.url"
                :title="item.title"
                class="head_pic"
              />
            </template>
          </el-table-column>
          <el-table-column prop="salechnl" align="center" label="销售渠道" width="160"></el-table-column>
          <el-table-column prop="agentinfor" align="center" label="营销员" width="180"></el-table-column>
          <el-table-column prop="posttitle" align="center" label="营销员标识" width="160"></el-table-column>
          <el-table-column prop="clmstate" align="center" label="案件状态" width="160"></el-table-column>
          <el-table-column prop="time" align="center" label="理赔时效（天）" width="160"></el-table-column>
        </el-table>
        <div style="margin-top:10px;">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pagesize"
            layout="prev, pager, next,jumper"
            :total="personData.length"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane name="second" v-if="this.primary.checkflag === '1'">
        <span slot="label">审核({{personData1.length}})</span>
        <el-table
          style="width: 100%"
          :data="personData1.slice((currpage1 - 1) * pagesize1, currpage1 * pagesize1)"
          @row-dblclick="handle1"
        >
          <el-table-column label="序号" align="center" type="index" width="50" :index="indexMethod1"></el-table-column>
          <el-table-column prop="rgtno" align="center" label="理赔号" width="180"></el-table-column>
          <el-table-column prop="makedate" align="center" label="受理日期" width="160"></el-table-column>
          <el-table-column prop="reportchnl" align="center" label="受理渠道" width="140"></el-table-column>
          <el-table-column prop="customername" align="center" label="客户姓名" width="160"></el-table-column>
          <el-table-column prop="vipflag" align="center" label="客户标识" width="140">
            <template slot-scope="scope">
              <img
                v-for="(item,index) in scope.row.vipflag"
                :key="index"
                :src="item.url"
                :title="item.title"
                class="head_pic"
              />
            </template>
          </el-table-column>
          <el-table-column prop="salechnl" align="center" label="销售渠道" width="160"></el-table-column>
          <el-table-column prop="agentinfor" align="center" label="营销员" width="180"></el-table-column>
          <el-table-column prop="posttitle" align="center" label="营销员标识" width="160"></el-table-column>
          <el-table-column prop="clmstate" align="center" label="案件状态" width="160"></el-table-column>
          <el-table-column prop="time" align="center" label="理赔时效（天）" width="160"></el-table-column>
        </el-table>
        <div style="margin-top:10px;">
          <el-pagination
            background
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :page-size="pagesize1"
            layout="prev, pager, next,jumper"
            :total="personData1.length"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane name="third" v-if="this.primary.uwflag === '1'">
        <span slot="label">审批({{personData2.length}})</span>
        <el-table
          style="width: 100%"
          :data="personData2.slice((currpage2 - 1) * pagesize2, currpage2 * pagesize2)"
          @row-dblclick="handle2"
        >
          <el-table-column label="序号" align="center" type="index" width="50" :index="indexMethod2"></el-table-column>
          <el-table-column prop="rgtno" align="center" label="理赔号" width="180"></el-table-column>
          <el-table-column prop="makedate" align="center" label="受理日期" width="160"></el-table-column>
          <el-table-column prop="reportchnl" align="center" label="受理渠道" width="140"></el-table-column>
          <el-table-column prop="customername" align="center" label="客户姓名" width="160"></el-table-column>
          <el-table-column prop="vipflag" align="center" label="客户标识" width="140">
            <template slot-scope="scope">
              <img
                v-for="(item,index) in scope.row.vipflag"
                :key="index"
                :src="item.url"
                :title="item.title"
                class="head_pic"
              />
            </template>
          </el-table-column>
          <el-table-column prop="salechnl" align="center" label="销售渠道" width="160"></el-table-column>
          <el-table-column prop="agentinfor" align="center" label="营销员" width="180"></el-table-column>
          <el-table-column prop="posttitle" align="center" label="营销员标识" width="160"></el-table-column>
          <el-table-column prop="clmstate" align="center" label="案件状态" width="160"></el-table-column>
          <el-table-column prop="time" align="center" label="理赔时效（天）" width="160"></el-table-column>
        </el-table>
        <div style="margin-top:10px;">
          <el-pagination
            background
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :page-size="pagesize2"
            layout="prev, pager, next,jumper"
            :total="personData2.length"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane name="fourth">
        <span slot="label">绿色通道({{greenData.length}})</span>
        <el-table
          style="width: 100%"
          :data="greenData.slice((currpage3 - 1) * pagesize3, currpage3 * pagesize3)"
          @row-dblclick="handle3"
        >
          <el-table-column label="序号" align="center" type="index" width="50" :index="indexMethod3"></el-table-column>
          <el-table-column prop="rgtno" align="center" label="理赔号" width="180"></el-table-column>
          <el-table-column prop="makedate" align="center" label="受理日期" width="160"></el-table-column>
          <el-table-column prop="reportchnl" align="center" label="受理渠道" width="140"></el-table-column>
          <el-table-column prop="customername" align="center" label="客户姓名" width="160"></el-table-column>
          <el-table-column prop="vipflag" align="center" label="客户标识" width="140">
            <template slot-scope="scope">
              <img
                v-for="(item,index) in scope.row.vipflag"
                :key="index"
                :src="item.url"
                :title="item.title"
                class="head_pic"
              />
            </template>
          </el-table-column>
          <el-table-column prop="salechnl" align="center" label="销售渠道" width="160"></el-table-column>
          <el-table-column prop="agentinfor" align="center" label="营销员" width="180"></el-table-column>
          <el-table-column prop="posttitle" align="center" label="营销员标识" width="160"></el-table-column>
          <el-table-column prop="clmstate" align="center" label="案件状态" width="160"></el-table-column>
          <el-table-column prop="time" align="center" label="理赔时效（天）" width="160"></el-table-column>
        </el-table>
        <div style="margin-top:10px;">
          <el-pagination
            background
            @size-change="handleSizeChange3"
            @current-change="handleCurrentChange3"
            :page-size="pagesize3"
            layout="prev, pager, next,jumper"
            :total="greenData.length"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="block">
      <span style="font-size:14px;">受理日期</span>
      <el-date-picker
        @blur="blurStartData"
        v-model="startTime"
        type="date"
        size="small"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
      ></el-date-picker>
      <span style="font-size:14px;">至</span>
      <el-date-picker
        @blur="blurEndData"
        v-model="endTime"
        type="date"
        size="small"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
      ></el-date-picker>
      <el-button type="primary" size="small" @click="queryData">查询</el-button>
    </div>

    <!-- 提示框 -->
  </div>
</template>
<script>
import axios from "axios";
import { post, service } from "../../utils/request.js";
import { generateUUID, getDate, getTime } from "../../utils/common.js";
export default {
  data() {
    return {
      activeName: "",
      choseIndex: "",
      pagesize: 10,
      currpage: 1,
      pagesize1: 10,
      currpage1: 1,
      pagesize2: 10,
      currpage2: 1,
      pagesize3: 10,
      currpage3: 1,

      personData: [],
      personData1: [],
      personData2: [],
      greenData: [],
      startTime: "",
      endTime: "",
      // registerflag: localStorage.getItem("registerflag"),
      // checkflag: localStorage.getItem("checkflag"),
      // uwflag: localStorage.getItem("uwflag"),
      primary: {},
      isbox: true,
      style1: {
        margin: "0 0 0 15px"
      }
    };
  },
  created() {
    this.clmno = this.$route.query.clmno;
    this.workbenchList();
    this.workbenchList1();
    this.workbenchList2();
    this.workbenchGreen();
    this.getPrimery();
  },
  mounted() {
    setTimeout(() => {
      if (this.activeName == "first") {
          this.choseIndex = "0000005015";
        } else if (this.activeName == "second") {
          this.choseIndex = "0000005035";
        } else if (this.activeName == "third") {
          this.choseIndex = "0000005055";
        } else if (this.activeName == "fourth") {
          this.choseIndex = "0000005075";
        }
    },100);
  },
  methods: {
    handleClick(tab, event) {
      this.isbox = true;
      if (tab.index === "0") {
        this.style1 = "margin: 0 0 0 15px";
        if (this.activeName == "first") {
          this.choseIndex = "0000005015";
        } else if (this.activeName == "second") {
          this.choseIndex = "0000005035";
        } else if (this.activeName == "third") {
          this.choseIndex = "0000005055";
        } else if (this.activeName == "fourth") {
          this.choseIndex = "0000005075";
        }
      }
      if (tab.index === "1") {
        this.style1 = "margin: 0 0 0 141px";
        if (this.activeName == "first") {
          this.choseIndex = "0000005015";
        } else if (this.activeName == "second") {
          this.choseIndex = "0000005035";
        } else if (this.activeName == "third") {
          this.choseIndex = "0000005055";
        } else if (this.activeName == "fourth") {
          this.choseIndex = "0000005075";
        }
      }
      if (tab.index === "2") {
        this.style1 = "margin: 0 0 0 270px";
        if (this.activeName == "first") {
          this.choseIndex = "0000005015";
        } else if (this.activeName == "second") {
          this.choseIndex = "0000005035";
        } else if (this.activeName == "third") {
          this.choseIndex = "0000005055";
        } else if (this.activeName == "fourth") {
          this.choseIndex = "0000005075";
        }
      }
      if (tab.index === "3") {
        this.style1 = "margin: 0 0 0 370px";
        if (this.activeName == "first") {
          this.choseIndex = "0000005015";
        } else if (this.activeName == "second") {
          this.choseIndex = "0000005035";
        } else if (this.activeName == "third") {
          this.choseIndex = "0000005055";
        } else if (this.activeName == "fourth") {
          this.choseIndex = "0000005075";
        }
      }
    },
    // 用户权限信息
    getPrimery() {
      post(service.getPrimery, {
        bodys: {
          operator: localStorage.getItem("userCode"),
          mngcom: localStorage.getItem("comCode")
        }
      }).then(result => {
        this.primary = result.data.bodys;
        if (this.primary.registerflag === "1") {
          this.activeName = "first";
        } else if (this.primary.checkflag === "1") {
          this.activeName = "second";
        } else if (this.primary.uwflag === "1") {
          this.activeName = "third";
        } else {
          this.activeName = "fourth";
        }
        // localStorage.setItem("registerflag", this.primary.registerflag); // 立案权限
        // localStorage.setItem("notesignflag", this.primary.notesignflag); // 下发照会权限
        // localStorage.setItem("noteuwflag", this.primary.noteuwflag); // 照会审批权限
        // localStorage.setItem("startinqflag", this.primary.startinqflag); // 提起调查权限
        // localStorage.setItem("inquwflag", this.primary.inquwflag); // 调查审批权限
        // localStorage.setItem("taskassignflag", this.primary.taskassignflag); // 任务分配权限
        // localStorage.setItem("startsecondflag", this.primary.startsecondflag); // 提起二核权限
        // localStorage.setItem("seconduwflag", this.primary.seconduwflag); // 二核审批权限
        // localStorage.setItem("secondreplayflag", this.primary.secondreplayflag); // 二核回复权限
        // localStorage.setItem("checkflag", this.primary.checkflag); // 案件审核权限
        // localStorage.setItem("uwflag", this.primary.uwflag); // 案件审批权限
        // localStorage.setItem("exemptflag", this.primary.exemptflag); // 豁免权限
        // localStorage.setItem("homepageflag", this.primary.homepageflag); // 首页权限
      });
    },
    // 受理日期结束失焦校验
    blurEndData() {
      if (this.startTime && this.endTime) {
        if (
          Math.ceil(
            (new Date(this.endTime).getTime() -
              new Date(this.startTime).getTime()) /
              86400000
          ) > 365
        ) {
          this.$message.error("查询区间最大不得超过365天！");
          this.endTime = null;
          this.startTime = null;
        }
      }
      if (this.startTime && this.endTime) {
        if (
          (new Date(this.endTime).getTime() -
            new Date(this.startTime).getTime()) /
            1000 <
          0
        ) {
          this.$message.error("开始日期不能大于结束日期！");
          this.endTime = null;
        }
      }
    },
    // 受理日期开始失焦校验
    blurStartData() {
      if (this.startTime && this.endTime) {
        if (
          Math.ceil(
            (new Date(this.endTime).getTime() -
              new Date(this.startTime).getTime()) /
              86400000
          ) > 365
        ) {
          this.$message.error("查询区间最大不得超过365天！");
          this.startTime = null;
          this.endTime = null;
        }
      }
      if (this.startTime && this.endTime) {
        if (
          (new Date(this.endTime).getTime() -
            new Date(this.startTime).getTime()) /
            1000 <
          0
        ) {
          this.$message.error("开始日期不能大于结束日期！");
          this.startTime = null;
        }
      }
    },
    // 查询按钮
    queryData() {
      if (
        (!this.startTime && this.endTime) ||
        (!this.endTime && this.startTime)
      ) {
        this.$message.error("请完整输入查询区间！");
        return;
      }

      if (this.choseIndex == "0000005075") {
        this.workbenchGreen();
      }
      post(service.workbenchList, {
        bodys: {
          operator: localStorage.getItem("userCode"),
          mngcom: localStorage.getItem("comCode"),
          startDate: this.startTime,
          endDate: this.endTime,
          activityid: this.choseIndex //0000005035  0000005055
        }
      }).then(res => {
        if (this.choseIndex == "0000005015") {
          if (res.data.bodys.rows == null) {
            this.personData = [];
          } else {
            this.personData = res.data.bodys.rows;
          }
        } else if (this.choseIndex == "0000005035") {
          if (res.data.bodys.rows == null) {
            this.personData1 = [];
          } else {
            this.personData1 = res.data.bodys.rows;
          }
        } else if (this.choseIndex == "0000005055") {
          if (res.data.bodys.rows == null) {
            this.personData2 = [];
          } else {
            this.personData2 = res.data.bodys.rows;
          }
        }
      });
    },
    // 绿色通道
    workbenchGreen() {
      post(service.workbenchGreen, {
        bodys: {
          operator: localStorage.getItem("userCode"),
          mngcom: localStorage.getItem("comCode"),
          startDate: this.startTime,
          endDate: this.endTime
        }
      }).then(res => {
        if (res.data.bodys.rows == null) {
          this.greenData = [];
        } else {
          this.greenData = res.data.bodys.rows;
          this.greenData.forEach(item => {
            if (item.vipflag) {
              item.vipflag = item.vipflag.split(",");
              if (item.vipflag.indexOf("5") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/vip.png"),
                  title: "vip"
                });
              }
              if (item.vipflag.indexOf("1") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/black.png"),
                  title: "黑名单"
                });
              }
              if (item.vipflag.indexOf("2") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/grey.png"),
                  title: "灰名单"
                });
              }

              if (item.vipflag.indexOf("3") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/money.png"),
                  title: "反洗钱"
                });
              }
              if (item.vipflag.indexOf("4") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/fraud.png"),
                  title: "反欺诈"
                });
              }
            }
          });
        }
      });
    },
    // 审核
    workbenchList1() {
      post(service.workbenchList, {
        bodys: {
          operator: localStorage.getItem("userCode"),
          mngcom: localStorage.getItem("comCode"),
          startDate: this.startTime,
          endDate: this.endTime,
          activityid: "0000005035" //0000005035  0000005055
        }
      }).then(res => {
        if (res.data.bodys.rows == null) {
          this.personData1 = [];
        } else {
          this.personData1 = res.data.bodys.rows;
          this.personData1.forEach(item => {
            if (item.vipflag) {
              item.vipflag = item.vipflag.split(",");
              if (item.vipflag.indexOf("5") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/vip.png"),
                  title: "vip"
                });
              }
              if (item.vipflag.indexOf("1") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/black.png"),
                  title: "黑名单"
                });
              }
              if (item.vipflag.indexOf("2") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/grey.png"),
                  title: "灰名单"
                });
              }

              if (item.vipflag.indexOf("3") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/money.png"),
                  title: "反洗钱"
                });
              }
              if (item.vipflag.indexOf("4") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/fraud.png"),
                  title: "反欺诈"
                });
              }
            }
          });
        }
      });
    },
    // 审批
    workbenchList2() {
      post(service.workbenchList, {
        bodys: {
          operator: localStorage.getItem("userCode"),
          mngcom: localStorage.getItem("comCode"),
          startDate: this.startTime,
          endDate: this.endTime,
          activityid: "0000005055" //0000005035  0000005055
        }
      }).then(res => {
        if (res.data.bodys.rows == null) {
          this.personData2 = [];
        } else {
          this.personData2 = res.data.bodys.rows;
          this.personData2.forEach(item => {
            if (item.vipflag) {
              item.vipflag = item.vipflag.split(",");
              if (item.vipflag.indexOf("5") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/vip.png"),
                  title: "vip"
                });
              }
              if (item.vipflag.indexOf("1") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/black.png"),
                  title: "黑名单"
                });
              }
              if (item.vipflag.indexOf("2") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/grey.png"),
                  title: "灰名单"
                });
              }

              if (item.vipflag.indexOf("3") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/money.png"),
                  title: "反洗钱"
                });
              }
              if (item.vipflag.indexOf("4") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/fraud.png"),
                  title: "反欺诈"
                });
              }
            }
          });
        }
      });
    },
    // 立案
    workbenchList() {
      post(service.workbenchList, {
        bodys: {
          operator: localStorage.getItem("userCode"),
          mngcom: localStorage.getItem("comCode"),
          startDate: this.startTime,
          endDate: this.endTime,
          activityid: "0000005015" //0000005035  0000005055
        }
      }).then(res => {
        if (res.data.bodys.rows == null) {
          this.personData = [];
        } else {
          this.personData = res.data.bodys.rows;
          this.personData.forEach(item => {
            if (item.vipflag) {
              item.vipflag = item.vipflag.split(",");
              if (item.vipflag.indexOf("5") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/vip.png"),
                  title: "vip"
                });
              }
              if (item.vipflag.indexOf("1") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/black.png"),
                  title: "黑名单"
                });
              }
              if (item.vipflag.indexOf("2") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/grey.png"),
                  title: "灰名单"
                });
              }

              if (item.vipflag.indexOf("3") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/money.png"),
                  title: "反洗钱"
                });
              }
              if (item.vipflag.indexOf("4") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/fraud.png"),
                  title: "反欺诈"
                });
              }
            }
          });
        }
      });
    },
    // 双击立案行跳转
    handle(row) {
      var rgtNo = row.rgtno;
      var customerNo = row.customerno;
      this.$router.push({
        name: "AddFiling",
        query: { rgtno: rgtNo, customerno: customerNo }
      });
    },
    // 双击审核行跳转
    handle1(row) {
      this.$router.push({
        name: "ReviewInformation",
        params: { dataOfTable: JSON.stringify(row) }
      });
    },
    // 双击审批行跳转
    handle2(row) {
      this.$router.push({
        name: "EAListDetails1",
        params: { dataOfTable: JSON.stringify(row) }
      });
    },
    // 双击绿色通道行跳转
    handle3(row) {
      if (row.clmstate == "立案") {
        var rgtNo = row.rgtno;
        var customerNo = row.customerno;
        this.$router.push({
          name: "AddFiling",
          query: { rgtno: rgtNo, customerno: customerNo }
        });
      } else if (row.clmstate == "审核") {
        this.$router.push({
          name: "ReviewInformation",
          params: { dataOfTable: JSON.stringify(row) }
        });
      } else if (row.clmstate == "审批") {
        this.$router.push({
          name: "EAListDetails1",
          params: { dataOfTable: JSON.stringify(row) }
        });
      }
    },
    // 分页
    indexMethod(index) {
      return index + 1 + (this.currpage - 1) * 10;
    },

    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currpage = val;
    },
    handleSizeChange1(val) {
      this.pagesize1 = val;
    },
    handleCurrentChange1(val) {
      this.currpage1 = val;
    },
    handleSizeChange2(val) {
      this.pagesize2 = val;
    },
    handleCurrentChange2(val) {
      this.currpage2 = val;
    },
    handleSizeChange3(val) {
      this.pagesize2 = val;
    },
    handleCurrentChange3(val) {
      this.currpage3 = val;
    },
    indexMethod3(index) {
      return index + 1 + (this.currpage3 - 1) * 10;
    },
    indexMethod1(index) {
      return index + 1 + (this.currpage1 - 1) * 10;
    },
    indexMethod2(index) {
      return index + 1 + (this.currpage2 - 1) * 10;
    },
    selectItem(key) {
      this.choseIndex = key;
      // this.initData();
      if (key === "01") {
      } else if (key === "02") {
      } else if (key === "03") {
      }
    },
    codeToname: function(obj, arr) {
      var a = null;
      arr.forEach(element => {
        if (element.code === obj) {
          a = element.name;
        }
      });
      return a;
    },
    applyTask() {}
  }
};
</script>
<style lang="less" scoped>
/deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 180px;
}
.colorSet {
  border-bottom: 1.5px solid #0673ff;
  color: #0673ff;
}
.diplomatic {
  position: relative;
  .block {
    // background-color: rgba(233, 238, 243, 1);
    height: 60px;
    box-sizing: border-box;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  /deep/.el-tabs__active-bar {
    border: none;
    background: transparent;
  }
  /deep/ .el-tabs__item {
    background: #fff;
    font-size: 16px;
    padding: 0;
    text-align: center;
    width: 120px;
    border-right: 1px solid #f1f1f1;
  }
  /deep/ .el-tabs__item:hover {
    color: #000;
  }
  /deep/ .el-tabs__item.is-active {
    background-color: #0673ff;
    border-bottom: none;
    border-radius: 8px 8px 0 0;
    color: #fff;
  }
  .box {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #0673ff;
    position: absolute;
    z-index: 999;
  }
  /deep/ .el-tabs__header {
    margin: 0;
  }
  .diplomatic-cla {
    display: flex;
    position: relative;
    .block {
      background-color: rgba(233, 238, 243, 1);
      height: 60px;
      box-sizing: border-box;
      position: absolute;
      right: 0px;
      top: 8px;
    }
    .diplomatic-cla-1 {
      display: flex;
      margin-left: 10px;
      div {
        height: 50px;
        // width: 100px;
        padding: 0 10px;
        align-items: center;
        display: flex;
        justify-content: center;
        box-shadow: 0 0 2px #999999;
      }
    }
  }

  .el-row {
    margin-top: 20px;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    padding: 0 20px;
    box-sizing: border-box;
    border-radius: 4px;
    height: 100px;
    background-color: #fff;
    line-height: 100px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .text {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    margin-left: 10px;
    color: rgba(102, 102, 102, 1);
    opacity: 1;
  }

  .year_text {
    font-size: 60px;
    font-family: DIN Alternate;
    font-weight: bold;
    color: rgba(246, 78, 111, 1);
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
    float: right;
  }

  .work_queue {
    position: relative;
    span {
      display: inline-block;
      background-color: #0673ff;
      color: #fff;
      padding: 0 15px;
      height: 33px;
      line-height: 33px;
      border-radius: 10px 10px 0 0;
    }

    .box {
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid #0673ff;
      position: absolute;
      top: 33px;
      left: 15px;
      z-index: 999;
    }
  }
}
</style>