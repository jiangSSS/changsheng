<template>
  <div class="accumulator">
    <el-collapse v-model="activeName">
      <el-collapse-item name="1">
        <template slot="title">
          产品查询
          <i
            class="header-icon el-icon-caret-bottom"
            style="margin: 0 8px 0 auto;font-size: 30px;"
          ></i>
        </template>
        <el-form :label-position="labelPosition" :model="form1" label-width="120px">
          <el-row>
            <el-col :span="8">
              <div class="colItem firstcolItem">
                <el-form-item label="产品险种代码">
                  <el-input v-model="form1.riskCode" disabled></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div>
      <div class="work_queue">
        <span>已有责任</span>
        <div class="box"></div>
      </div>
      <div class="work_table">
        <el-table
          :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
          style="width: 100%"
          highlight-current-row
        >
          <el-table-column label="序号" type="index" width="60" :index="indexMethod" align="center"></el-table-column>
          <el-table-column prop="dutycode" label="责任编码" align="center"></el-table-column>
          <el-table-column prop="dutyname" label="责任名称" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deleteLmRiskDuty(scope.row,scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pagesize"
            background
            layout="prev, pager, next, jumper"
            :total="tableData.length"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-collapse v-model="activeName">
      <el-collapse-item name="2" class="collapse-item">
        <template slot="title">
          责任配置
          <i
            class="header-icon el-icon-caret-bottom"
            style="margin: 0 8px 0 auto;font-size: 30px;"
          ></i>
        </template>
        <el-form
          :label-position="labelPosition"
          label-width="120px"
          :model="form2"
          :rules="form2rules"
          ref="form2"
        >
          <el-row class="firstRow">
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="责任编码" prop="dutycode">
                  <el-input v-model="form2.dutycode" maxlength="10"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="责任名称" prop="dutyname">
                  <el-input v-model="form2.dutyname"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="colItem">
                <el-button type="primary" @click="insertLmDuty('form2')">新增</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <!-- <div class="footBtnAll">
          <el-button class="elButton" type="primary" @click="toAdd('form2')">新增</el-button>
        </div>-->
      </el-collapse-item>
    </el-collapse>
    <el-collapse v-model="activeName">
      <el-collapse-item name="3">
        <template slot="title">
          未拥有责任查询
          <i
            class="header-icon el-icon-caret-bottom"
            style="margin: 0 8px 0 auto;font-size: 30px;"
          ></i>
        </template>
        <el-form :label-position="labelPosition" :model="form3" label-width="120px">
          <el-row>
            <el-col :span="8">
              <div class="colItem firstcolItem">
                <el-form-item label="责任编码">
                  <el-input v-model="form3.dutycode"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="colItem firstcolItem">
                <el-form-item label="责任名称" prop="inpflag">
                  <el-input v-model="form3.dutyname"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="colItem firstcolItem">
                <el-button type="primary" @click="selectLmDutyUn">查询</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div>
      <div class="work_queue">
        <span>未拥有责任</span>
        <div class="box"></div>
      </div>
      <div class="work_table">
        <el-table
          :data="tableData1.slice((currpage1 - 1) * pagesize1, currpage1 * pagesize1)"
          style="width: 100%"
          highlight-current-row
          @row-click="getcalculatorcode"
        >
          <el-table-column label="序号" type="index" width="60" :index="indexMethod1" align="center"></el-table-column>
          <el-table-column prop="dutycode" label="责任编码" align="center"></el-table-column>
          <el-table-column prop="dutyname" label="责任名称" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="addLmDutyAndRela(scope.row,scope.$index)"
              >添加</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :page-size="pagesize1"
            background
            layout="prev, pager, next, jumper"
            :total="tableData1.length"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-button type="primary" style="float:right;margin-right:30px;" @click="goback">返回</el-button>
  </div>
</template>
<script>
import axios from "axios";
import { post, service } from "../../utils/request.js";
export default {
  name: "accumulator",
  data() {
    return {
      labelPosition: "left",
      activeName: ["1", "2", "3"],

      form1: {
        riskCode: "" // 产品险种代码
      },
      // -----------------------
      form2: {
        dutycode: "",
        dutyname: ""
      },
      form2rules: {
        dutycode: [
          { required: true, message: "责任编码不能为空", trigger: "blur" }
        ],
        dutyname: [
          { required: true, message: "责任名称不能为空", trigger: "blur" }
        ]
      },
      form3: {
        dutycode: "",
        dutyname: ""
      },
      //------------------------
      //------------------------
      tableData: [],
      tableData1: [],
      pagesize1: 10,
      currpage1: 1,
      pagesize: 10,
      currpage: 1,
      calculatorcode: "", // 累加器编号
      serialno: "", // 交易流水号
      getdutycode: "",
      getdutykind: "",
      dutycode: ""
    };
  },
  created() {
    this.form1.riskCode = this.$route.query.riskcode;
    this.selectLmDuty();
  },
  mounted() {
    this.$watermark.set(
      localStorage.getItem("userCode"),
      localStorage.getItem("userName")
    );
  },
  methods: {
    goback() {
      this.$router.push({ path: "/productConfig" });
    },
    // 已有责任查询
    selectLmDuty() {
      post(service.selectLmDuty, {
        bodys: {
          kindcode: this.form1.riskCode
        }
      }).then(res => {
        if (res.data.headers.code === "200") {
          this.tableData = res.data.bodys.rows;
        }
      });
    },
    // 未有责任查询
    selectLmDutyUn() {
      post(service.selectLmDutyUn, {
        bodys: {
          kindcode: this.form1.riskCode,
          dutycode: this.form3.dutycode,
          dutyname: this.form3.dutyname
        }
      }).then(res => {
        if (res.data.headers.code === "200") {
          this.tableData1 = res.data.bodys.rows;
        } else {
          this.$message.error(res.data.headers.message);
        }
      });
    },
    // 已有责任移除
    deleteLmRiskDuty(row) {
      post(service.deleteLmRiskDuty, {
        bodys: {
          kindcode: this.form1.riskCode,
          dutycode: row.dutycode
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          this.$message.success("操作成功！");
          this.selectLmDuty();
        }
      });
    },
    // 未有责任添加
    addLmDutyAndRela(row) {
      post(service.addLmDutyAndRela, {
        bodys: {
          kindcode: this.form1.riskCode,
          dutycode: row.dutycode
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          this.$message.success("操作成功！");
          this.selectLmDutyUn();
          this.selectLmDuty();
        }
      });
    },
    // 责任新增并与产品关联
    insertLmDuty(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.$message.error("请先填写必填项！");
          return false;
        } else {
          post(service.insertLmDuty, {
            bodys: {
              kindcode: this.form1.riskCode,
              dutycode: this.form2.dutycode,
              dutyname: this.form2.dutyname
            }
          }).then(res => {
            if (res.data.header.success === true) {
              this.$message.success(res.data.header.message);
              this.selectLmDuty();
            } else if (res.data.header.success == false) {
              this.$message.error(res.data.header.message);
            }
          });
        }
      });
    },

    getcalculatorcode(row) {
      this.calculatorcode = row.calculatorcode;
      this.formData = row;
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
    },
    indexMethod(index) {
      return index + 1 + (this.currpage - 1) * 10;
    },
    handleCurrentChange(val) {
      this.currpage = val;
    },
    handleSizeChange1(val) {
      this.pagesize1 = val;
    },
    indexMethod1(index) {
      return index + 1 + (this.currpage1 - 1) * 10;
    },
    handleCurrentChange1(val) {
      this.currpage1 = val;
    }
  }
};
</script>
<style lang="less" scoped>
.firstRow {
  margin-top: 20px;
}
.collapse-item {
  margin-bottom: 20px;
}
/deep/ .el-date-editor.el-input {
  width: 100%;
}
/deep/.el-collapse-item__arrow {
  display: none;
}
/deep/.el-collapse-item__header {
  background-color: #0673ff;
  height: 30px;
  line-height: 30px;
  border-radius: 10px 10px 0 0;
  padding: 0 15px;
  overflow: hidden;
  color: #fff;
  font-size: 16px;
  font-family: Source Han Sans CN;
}
/deep/.el-collapse-item__content {
  padding-bottom: 0;
}
.colItem {
  padding: 0 30px;
}
.firstcolItem {
  margin-top: 30px;
}
/deep/.el-form-item {
  margin-bottom: 35px;
}
.footBtnAll {
  margin-left: 40px;
  padding-bottom: 30px;
}
.accumulator {
  margin: 20px;

  .header {
    background-color: #0673ff;
    height: 50px;
    line-height: 50px;
    border-radius: 25px 25px 0 0;
    padding: 0 30px;
    overflow: hidden;
    color: #fff;
    font-size: 16px;
    font-family: Source Han Sans CN;
    i {
      font-size: 30px;
      float: right;
      margin-top: 19px;
    }
  }
  .el-form {
    background-color: #fff;
  }
  .work_queue {
    position: relative;
    margin-top: 21px;
    span {
      display: inline-block;
      background-color: #0673ff;
      color: #fff;
      padding: 0 15px;
      height: 33px;
      line-height: 33px;
      font-size: 16px;
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
  .block {
    background-color: #fff;
    height: 80px;
    padding-top: 20px;
    box-sizing: border-box;
    margin-bottom: 30px;
  }
  .img_style {
    width: 27px;
    height: 22px;
  }
}
</style>
<style lang="less">
.accumulator {
  .el-row {
    // padding-top: 20px;
    &:first-child {
      padding-top: 20px;
    }
    &:last-child {
      padding-top: 0;
      margin-bottom: 0;
    }
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
.accumulator {
  //   .el-input {
  //     width: 80% !important;
  //   }
  .date_style {
    .el-input {
      width: 46% !important;
    }
  }

  .el-select {
    width: 100% !important;
    .el-input {
      width: 100% !important;
    }
  }

  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row > td,
  .el-table__body tr.hover-row.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped > td,
  .el-table__body tr.hover-row > td {
    background-color: #409eff;
  }
}
</style>
