<template>
  <div class="claimMonthForm">
    <el-collapse v-model="activeName">
      <el-collapse-item name="1">
        <template slot="title">
          统计信息
          <i
            class="header-icon el-icon-caret-bottom"
            style="margin: 0 8px 0 auto;font-size: 30px;"
          ></i>
        </template>
        <el-form
          ref="listForm"
          :model="listForm"
          v-model="labelPosition"
          label-width="34%"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="机构" prop="managecom">
                  <el-select
                    v-model="listForm.managecom"
                    clearable
                    placeholder="请选择"
                    :disabled="agency"
                  >
                    <el-option
                      v-for="item in agencyList"
                      :key="item.filingAgency"
                      :label="item.agencyName"
                      :value="item.filingAgency"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="统计止期" prop="validenddate">
                  <el-date-picker
                    v-model="listForm.enddate"
                    :picker-options="disdate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择统计止期"
                  ></el-date-picker>
                  <!-- <el-select
                    v-model="listForm.year"
                    placeholder="YYYY"
                    @visible-change="getYear($event)"
                  >
                    <el-option
                      v-for="item in years"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>-->
                  <!-- <el-date-picker
                    v-model="listForm.validenddate"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy"
                  ></el-date-picker>-->
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row style="text-align:right;padding-right:30px;">
            <el-button type="primary" round @click="downLoad">打印个险理赔月报表</el-button>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import { post, service } from "../../utils/request.js";
export default {
  name: "claimMonthForm",
  data() {
    return {
      agency: true,
      listForm: {
        managecom: "",
        // year: "",
        enddate: ""
      },
      years: [],
      activeName: ["1"],
      labelPosition: "right",
      agencyList: [],
      disdate: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  inject: ["reload"],
  created() {
    this.getCodeList();
    // this.getYear();
  },
  mounted() {
    this.$watermark.set(
      localStorage.getItem("userCode"),
      localStorage.getItem("userName")
    );
  },
  methods: {
    getCodeList: function() {
      post(service.mngComQuery, {
        bodys: {
          comCode: localStorage.getItem("comCode")
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          this.agencyList = res.data.bodys;
          // this.comGrade=this.agencyList[i].comGrade
          if (this.agencyList.length > 0) {
            this.agency = false;
          } else {
            this.agency = true;
          }
        }
      });
    },
    getYear() {
      var myDate = new Date();
      var startYear = myDate.getFullYear() - 50; // 起始年份
      var endYear = myDate.getFullYear() + 50; // 结束年份

      this.years = [];
      for (var i = startYear; i <= endYear; i++) {
        this.years.push({ value: i, label: i });
      }
      // for (var i = myDate;  i<=startYear; i--) {
      //   this.years.push({value: (i), label: (i)})
      // }
    },
    downLoad() {
      post(service.monReportFormGet, {
        bodys: this.listForm
      }).then(res => {
        if (res.data.bodys && res.data.bodys.filepath) {
          window.open(res.data.bodys.filepath);
        } else {
          // this.$message.error(res.data.header.message);
          this.$message.error("理赔报表无数据，请确认查询条件！");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.claimMonthForm {
  margin: 20px;
  .header {
    background-color: #0673ff;
    height: 50px;
    line-height: 50px;
    border-radius: 25px 25px 0 0;
    padding: 0 30px;
    overflow: hidden;
    color: #fff;
    font-size: 20px;
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
}
</style>
<style lang="less">
.claimMonthForm {
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
.claimMonthForm {
  .el-input {
    width: 85% !important;
  }
  .date_style {
    .el-input {
      width: 46% !important;
    }
  }

  .el-select {
    width: 85% !important;
    .el-input {
      width: 100% !important;
    }
  }
  .el-collapse-item__arrow {
    display: none;
  }
  .el-collapse-item__header {
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
  .el-collapse-item__content {
    padding-bottom: 17px;
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
