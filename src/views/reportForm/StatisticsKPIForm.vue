<template>
  <div class="statisticsKPIForm">
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
          :rules="rules"
        >
          <el-row>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="统计起期" prop="validstartdate">
                  <el-date-picker
                    v-model="listForm.validstartdate"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="统计止期" prop="validenddate">
                  <el-date-picker
                    v-model="listForm.validenddate"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row style="text-align:right;padding-right:30px;">
            <el-button
              type="primary"
              round
              @click="generateMarketingKpiReportForm('listForm')"
            >打印公司KPI考核(营销)</el-button>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import axios from "axios";
import { post, service } from "../../utils/request.js";
import { getTime } from "../../utils/common.js";
// import { getCodeArr } from "../../utils/service";
export default {
  name: "statisticsKPIForm",
  data() {
    return {
      listForm: {
        validenddate: "",
        validstartdate: ""
      },
      activeName: ["1"],
      labelPosition: "right",
      rules: {
        validstartdate: [
          {
            required: true,
            message: "请选择统计起期",
            trigger: "blur"
          }
        ],
        validenddate: [
          {
            required: true,
            message: "请选择统计止期",
            trigger: "blur"
          }
        ]
      }
    };
  },
  inject: ["reload"],
  created() {},
  mounted() {
    this.$watermark.set(
      localStorage.getItem("userCode"),
      localStorage.getItem("userName")
    );
  },
  methods: {
    generateMarketingKpiReportForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          if (
            (new Date(this.listForm.validenddate).getTime() -
              new Date(this.listForm.validstartdate).getTime()) /
              1000 <
            0
          ) {
            this.$message.error("统计起期不能大于统计止期！");
            return;
          }
          post(service.generateMarketingKpiReportForm, {
            bodys: {
              startDate: this.listForm.validstartdate,
              endDate: this.listForm.validenddate
            }
          }).then(res => {
            if (res.data.bodys) {
              window.open(res.data.bodys);
            } else {
              // this.$message.error(res.data.headers.message);
              this.$message.error('理赔报表无数据，请确认查询条件！');
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.statisticsKPIForm {
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
.statisticsKPIForm {
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
.statisticsKPIForm {
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
