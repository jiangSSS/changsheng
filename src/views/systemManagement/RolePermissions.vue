<template>
  <div class="rolePermissions">
    <el-collapse v-model="activeName">
      <el-collapse-item name="1">
        <template slot="title">
          理赔权限查询
          <i
            class="header-icon el-icon-caret-bottom"
            style="margin: 0 8px 0 auto;font-size: 30px;"
          ></i>
        </template>
        <el-form ref="listForm" :model="listForm" v-model="labelPosition" label-width="34%">
          <el-row>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="角色级别">
                  <el-input
                    v-model="listForm.rolelevel"
                    maxlength="100"
                    @keyup.enter.native="initList"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row style="text-align:right;padding-right:30px;">
            <el-button type="primary" round @click="initList">查 询</el-button>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>

    <!-- <img src="../../assets/images/report/inquire@1x.png" alt style="margin:30px 0;" /> -->

    <div class="work_queue">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>理赔角色权限列表</span>
      <div class="box"></div>
    </div>
    <div class="work_table">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        highlight-current-row
        @row-click="toDetails"
      >
        <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="100"></el-table-column>
        <el-table-column prop="rolelevel" label="角色权限级别" align="center"></el-table-column>
        <el-table-column prop="registerflag" label="立案权限" align="center">
          <template slot-scope="scope">
            <span>{{codeToname(scope.row.registerflag)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="taskassignflag" label="任务分配权限" align="center">
          <template slot-scope="scope">
            <span>{{codeToname(scope.row.taskassignflag)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="startsecondflag" label="提起二核权限" align="center">
          <template slot-scope="scope">
            <span>{{codeToname(scope.row.startsecondflag)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="seconduwflag" label="二核审批权限" align="center">
          <template slot-scope="scope">
            <span>{{codeToname(scope.row.seconduwflag)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="checkflag" label="案件审核权限" align="center">
          <template slot-scope="scope">
            <span>{{codeToname(scope.row.checkflag)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="uwflag" label="案件审批权限" align="center">
          <template slot-scope="scope">
            <span>{{codeToname(scope.row.uwflag)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="exemptflag" label="豁免处理权限" align="center">
          <template slot-scope="scope">
            <span>{{codeToname(scope.row.exemptflag)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="homepageflag" label="首页权限" align="center">
          <template slot-scope="scope">
            <span>{{codeToname(scope.row.homepageflag)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="currentPage"
          @current-change="currentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          background
          layout="prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <el-collapse v-model="activeName">
      <el-collapse-item name="2">
        <template slot="title">
          理赔权限信息维护
          <i
            class="header-icon el-icon-caret-bottom"
            style="margin: 0 8px 0 auto;font-size: 30px;"
          ></i>
        </template>
        <el-form
          ref="tableForm"
          :model="tableForm"
          v-model="labelPosition"
          label-width="34%"
          :rules="rules"
        >
          <el-row>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="角色级别" prop="rolelevel">
                  <el-input v-model="tableForm.rolelevel" maxlength="100"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="立案权限" prop="registerflag">
                  <el-select v-model="tableForm.registerflag">
                    <el-option label="有" value="1"></el-option>
                    <el-option label="无" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="下发照会权限" prop="notesignflag">
                  <el-select v-model="tableForm.notesignflag">
                    <el-option label="有" value="1"></el-option>
                    <el-option label="无" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="照会审批权限" prop="noteuwflag">
                  <el-select v-model="tableForm.noteuwflag">
                    <el-option label="有" value="1"></el-option>
                    <el-option label="无" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="提起调查权限" prop="startinqflag">
                  <el-select v-model="tableForm.startinqflag">
                    <el-option label="有" value="1"></el-option>
                    <el-option label="无" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="调查审批权限" prop="inquwflag">
                  <el-select v-model="tableForm.inquwflag">
                    <el-option label="有" value="1"></el-option>
                    <el-option label="无" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="任务分配权限" prop="taskassignflag">
                  <el-select v-model="tableForm.taskassignflag">
                    <el-option label="有" value="1"></el-option>
                    <el-option label="无" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="提起二核权限" prop="startsecondflag">
                  <el-select v-model="tableForm.startsecondflag">
                    <el-option label="有" value="1"></el-option>
                    <el-option label="无" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="二核审批权限" prop="seconduwflag">
                  <el-select v-model="tableForm.seconduwflag">
                    <el-option label="有" value="1"></el-option>
                    <el-option label="无" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="二核回复权限" prop="secondreplayflag">
                  <el-select v-model="tableForm.secondreplayflag">
                    <el-option label="有" value="1"></el-option>
                    <el-option label="无" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="案件审核权限" prop="checkflag">
                  <el-select v-model="tableForm.checkflag">
                    <el-option label="有" value="1"></el-option>
                    <el-option label="无" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="案件审批权限" prop="uwflag">
                  <el-select v-model="tableForm.uwflag">
                    <el-option label="有" value="1"></el-option>
                    <el-option label="无" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="豁免权限" prop="exemptflag">
                  <el-select v-model="tableForm.exemptflag">
                    <el-option label="有" value="1"></el-option>
                    <el-option label="无" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="首页权限" prop="homepageflag">
                  <el-select v-model="tableForm.homepageflag">
                    <el-option label="有" value="1"></el-option>
                    <el-option label="无" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="启用日期" prop="makedate">
                  <el-date-picker
                    type="date"
                    v-model="tableForm.makedate"
                    style="width: 100%;"
                    format="yyyy-MM-dd"
                    disabled
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16" class="special">
              <div class="grid-content">
                <el-form-item label="拒赔非医疗型赔案金额区间" prop="declunmedicalmin">
                  <el-input v-model="tableForm.declunmedicalmin" placeholder="请输入内容" maxlength="13"></el-input>&nbsp;至
                </el-form-item>
                <el-form-item prop="declunmedicalmax">
                  <el-input v-model="tableForm.declunmedicalmax" placeholder="请输入内容" maxlength="13"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="操作员" prop="username">
                  <el-input v-model="tableForm.username" disabled></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16" class="special">
              <div class="grid-content">
                <el-form-item label="正常获赔医疗型赔案金额区间" prop="commedicalmin">
                  <el-input v-model="tableForm.commedicalmin" placeholder="请输入内容" maxlength="13"></el-input>&nbsp;至
                </el-form-item>
                <el-form-item prop="commedicalmax">
                  <el-input v-model="tableForm.commedicalmax" placeholder="请输入内容" maxlength="13"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16" class="special">
              <div class="grid-content">
                <el-form-item label="正常获赔非医疗型赔案金额区间" prop="comunmedicalmin">
                  <el-input v-model="tableForm.comunmedicalmin" placeholder="请输入内容" maxlength="13"></el-input>&nbsp;至
                </el-form-item>
                <el-form-item prop="comunmedicalmax">
                  <el-input v-model="tableForm.comunmedicalmax" placeholder="请输入内容" maxlength="13"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16" class="special">
              <div class="grid-content">
                <el-form-item label="拒赔获赔医疗型赔案金额区间" prop="declmedicalmin">
                  <el-input v-model="tableForm.declmedicalmin" placeholder="请输入内容" maxlength="13"></el-input>&nbsp;至
                  <!-- <el-input v-model="tableForm.declmedicalmax" placeholder="请输入内容"></el-input> -->
                </el-form-item>
                <el-form-item label prop="declmedicalmax">
                  <!-- <el-input v-model="tableForm.declmedicalmin" placeholder="请输入内容"></el-input>&nbsp;至 -->
                  <el-input v-model="tableForm.declmedicalmax" placeholder="请输入内容" maxlength="13"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16" class="special">
              <div class="grid-content">
                <el-form-item label="通融赔付赔案金额区间" prop="appendmin">
                  <el-input v-model="tableForm.appendmin" placeholder="请输入内容" maxlength="13"></el-input>&nbsp;至
                  <!-- <el-input v-model="tableForm.appendmax" placeholder="请输入内容"></el-input> -->
                </el-form-item>
                <el-form-item label prop="appendmax">
                  <!-- <el-input v-model="tableForm.appendmin" placeholder="请输入内容"></el-input>&nbsp;至 -->
                  <el-input v-model="tableForm.appendmax" placeholder="请输入内容" maxlength="13"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16" class="special">
              <div class="grid-content">
                <el-form-item label="豁免赔案金额区间" prop="exemptmin">
                  <el-input v-model="tableForm.exemptmin" placeholder="请输入内容" maxlength="13"></el-input>&nbsp;至
                  <!-- <el-input v-model="tableForm.exemptmax" placeholder="请输入内容"></el-input> -->
                </el-form-item>
                <el-form-item label prop="exemptmax">
                  <!-- <el-input v-model="tableForm.exemptmin" placeholder="请输入内容"></el-input>&nbsp;至 -->
                  <el-input v-model="tableForm.exemptmax" placeholder="请输入内容" maxlength="13"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row style="text-align:right;padding-right:30px;">
            <el-button type="primary" round @click="addForm('tableForm')">增 加</el-button>
            <el-button type="primary" round @click="updateForm('tableForm')" :disabled="updata">修 改</el-button>
            <el-button type="primary" round @click="deleteF" :disabled="updata">删 除</el-button>
            <el-button type="primary" round @click="resetForm('tableForm')">重 置</el-button>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>

    <div class="work_queue">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>当前角色已拥有菜单组</span>
      <div class="box"></div>
    </div>
    <div class="work_table">
      <el-table
        ref="singleTable2"
        :data="tableData1.slice((currentPage1-1)*pagesize,currentPage1*pagesize)"
        style="width: 100%"
        highlight-current-row
        @row-click="deleteMenu"
        :row-class-name="select"
      >
        <el-table-column label="序号" type="index" :index="indexMethod1" align="center" width="100"></el-table-column>
        <el-table-column prop="menugrpname" label="菜单组名称" align="center"></el-table-column>
        <el-table-column prop="menugrpdescription" label="菜单组描述" align="center"></el-table-column>
      </el-table>
      <div style="background-color:#fff;text-align:right;padding:17px 17px 0 17px;">
        <el-button type="primary" round @click="deleteOne">删 除</el-button>
      </div>
      <div class="block">
        <el-pagination
          @size-change="currentPage1"
          @current-change="currentChange1"
          :current-page.sync="currentPage1"
          :page-size="10"
          background
          layout="prev, pager, next, jumper"
          :total="tableData1.length"
        ></el-pagination>
      </div>
    </div>

    <div class="work_queue">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>当前角色用户未拥有菜单组</span>
      <div class="box"></div>
    </div>
    <div class="work_table">
      <div class="block find">
        菜单组名称
        <el-input v-model="menugrpname" maxlength="100" @keyup.enter.native="find"></el-input>
        <el-button type="primary" round @click="find">查 询</el-button>
      </div>
      <el-table
        ref="singleTable"
        :data="tableData2.slice((currentPage2-1)*pagesize,currentPage2*pagesize)"
        style="width: 100%"
        highlight-current-row
        @row-click="addMenu"
        :row-class-name="table"
      >
        <el-table-column label="序号" type="index" :index="indexMethod2" align="center" width="100"></el-table-column>
        <el-table-column prop="menugrpname" label="菜单组名称" align="center"></el-table-column>
        <el-table-column prop="menugrpdescription" label="菜单组描述" align="center"></el-table-column>
      </el-table>
      <div style="background-color:#fff;text-align:right;padding:17px 17px 0 17px;">
        <el-button type="primary" round @click="addOne">增 加</el-button>
      </div>
      <div class="block">
        <el-pagination
          @size-change="currentPage2"
          @current-change="currentChange2"
          :current-page.sync="currentPage2"
          :page-size="10"
          background
          layout="prev, pager, next, jumper"
          :total="tableData2.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { post, service } from "../../utils/request.js";
// import { getCodeArr } from "../../utils/service";
export default {
  name: "ListQuery",
  data() {
    var isMoney = (rule, value, callback) => {
      if (!value) {
        return new Error("请输入年收入");
      } else {
        var reg = /^\d+$|^\d*\.\d+$/g;
        if (!reg.test(value)) {
          callback(new Error("只能填写数字！"));
        } else {
          if (
            ("" + value).substr(0, 1) === "." ||
            ("" + value).substr(-1, 1) === "."
          ) {
            callback(new Error("只能填写数字！"));
          } else {
            var amtreg = /^(\d+)(.\d{0,2})?$/;
            if (!amtreg.test(value)) {
              callback(new Error("最多支持两位小数！"));
            } else {
              callback();
            }
          }
        }
      }
    };
    return {
      updata: true,
      deleteCode: "",
      menugrpname: "",
      listForm: {
        rolelevel: ""
      },
      tableForm: {
        menuGrpInsertReqList: [],
        operator: localStorage.getItem("userCode"),
        registerflag: "0",
        notesignflag: "0",
        noteuwflag: "0",
        startinqflag: "0",
        startsecondflag: "0",
        inquwflag: "0",
        taskassignflag: "0",
        seconduwflag: "0",
        secondreplayflag: "0",
        checkflag: "0",
        uwflag: "0",
        exemptflag: "0",
        homepageflag: "0",
        makedate: "",
        username: "",
        declunmedicalmin: "",
        declunmedicalmax: "",
        commedicalmin: "",
        commedicalmax: "",
        comunmedicalmin: "",
        comunmedicalmax: "",
        declmedicalmin: "",
        declmedicalmax: "",
        appendmin: "",
        appendmax: "",
        exemptmin: "",
        exemptmax: ""
      },
      stateList: [
        {
          value: "0",
          name: "无"
        },
        {
          value: "1",
          name: "有"
        }
      ],
      agencyList: [],
      activeName: ["1", "2"],
      labelPosition: "right",
      currentPage: 1,
      currentPage1: 1,
      currentPage2: 1,
      tableData: [],
      tableData2: [],
      tableData1: [],
      pagesize: 10,
      total: 0,
      currentRow: "",
      rules: {
        rolelevel: [
          {
            required: true,
            message: "请输入角色级别",
            trigger: ["blur", "change"]
          }
        ],
        registerflag: [
          { required: true, message: "请选择立案权限", trigger: "change" }
        ],
        notesignflag: [
          { required: true, message: "请选择下发照会权限", trigger: "change" }
        ],
        noteuwflag: [
          { required: true, message: "请选择照会审批权限", trigger: "change" }
        ],
        startinqflag: [
          { required: true, message: "请选择提起调查权限", trigger: "change" }
        ],
        inquwflag: [
          { required: true, message: "请选择调查审批权限", trigger: "change" }
        ],
        taskassignflag: [
          { required: true, message: "请选择任务分配权限", trigger: "change" }
        ],
        startsecondflag: [
          { required: true, message: "请选择提起二核权限", trigger: "change" }
        ],
        seconduwflag: [
          { required: true, message: "请选择二核审批权限", trigger: "change" }
        ],
        secondreplayflag: [
          { required: true, message: "请选择二核回复权限", trigger: "change" }
        ],
        checkflag: [
          { required: true, message: "请选择案件审核权限", trigger: "change" }
        ],
        uwflag: [
          { required: true, message: "请选择案件审批权限", trigger: "change" }
        ],
        exemptflag: [
          { required: true, message: "请选择豁免权限", trigger: "change" }
        ],
        homepageflag: [
          { required: true, message: "请选择首页权限", trigger: "change" }
        ],
        declunmedicalmin: [
          {
            required: true,
            message: "请输入拒赔非医疗型赔案金额区间",
            trigger: ["blur", "change"]
          },
          { validator: isMoney, trigger: "blur" }
        ],
        declunmedicalmax: [
          {
            required: true,
            message: "请输入拒赔非医疗型赔案金额区间",
            trigger: ["blur", "change"]
          },
          { validator: isMoney, trigger: "blur" }
        ],
        commedicalmin: [
          {
            required: true,
            message: "请输入正常获赔医疗型赔案金额区间",
            trigger: ["blur", "change"]
          },
          { validator: isMoney, trigger: "blur" }
        ],
        commedicalmax: [
          {
            required: true,
            message: "请输入正常获赔医疗型赔案金额区间",
            trigger: ["blur", "change"]
          },
          { validator: isMoney, trigger: "blur" }
        ],
        comunmedicalmin: [
          {
            required: true,
            message: "请输入正常获赔非医疗型赔案金额区间",
            trigger: ["blur", "change"]
          },
          { validator: isMoney, trigger: "blur" }
        ],
        comunmedicalmax: [
          {
            required: true,
            message: "请输入正常获赔非医疗型赔案金额区间",
            trigger: ["blur", "change"]
          },
          { validator: isMoney, trigger: "blur" }
        ],

        declmedicalmin: [
          {
            required: true,
            message: "请输入拒赔获赔医疗型赔案金额区间",
            trigger: ["blur", "change"]
          },
          { validator: isMoney, trigger: "blur" }
        ],
        declmedicalmax: [
          {
            required: true,
            message: "请输入拒赔获赔医疗型赔案金额区间",
            trigger: ["blur", "change"]
          },
          { validator: isMoney, trigger: "blur" }
        ],
        appendmin: [
          {
            required: true,
            message: "请输入通融赔付赔案金额区间",
            trigger: ["blur", "change"]
          },
          { validator: isMoney, trigger: "blur" }
        ],
        appendmax: [
          {
            required: true,
            message: "请输入通融赔付赔案金额区间",
            trigger: ["blur", "change"]
          },
          { validator: isMoney, trigger: "blur" }
        ],
        exemptmin: [
          {
            required: true,
            message: "请输入豁免赔案金额区间",
            trigger: ["blur", "change"]
          },
          { validator: isMoney, trigger: "blur" }
        ],
        exemptmax: [
          {
            required: true,
            message: "请输入豁免赔案金额区间",
            trigger: ["blur", "change"]
          },
          { validator: isMoney, trigger: "blur" }
        ]
      },
      index1: "",
      indexSelect: "",
      deleteRow: ""
    };
  },
  inject: ["reload"],
  mounted() {
    this.find();
    this.$watermark.set(
      localStorage.getItem("userCode"),
      localStorage.getItem("userName")
    );
  },
  methods: {
    // 信息
    initList() {
      this.currentPage = 1;
      this.currentPage1 = 1;
      post(service.rolePopedomQuery, {
        bodys: this.listForm
      }).then(result => {
        if (result.data.header.code === "200") {
          this.tableData = result.data.bodys;
          this.total = result.data.bodys.length;
        }
      });
      // if (this.currentRow.rolecode) {
      //   // 当前角色已拥有菜单组
      //   post(service.menuGrpQuery, {
      //     bodys: {
      //       rolecode: this.currentRow.rolecode
      //     }
      //   }).then(res => {
      //     if (res.data.headers.code === "200" && res.data.headers.success) {
      //       this.tableData1 = res.data.bodys.rows;
      //     }
      //   });
      // }
    },
    codeToname: function(obj) {
      var a = null;
      this.stateList.forEach(element => {
        if (element.value == obj) {
          a = element.name;
        }
      });
      return a;
    },
    // 双击查询
    toDetails(val) {
      this.updata = false;
      this.currentRow = val;
      sessionStorage.setItem("rowA", JSON.stringify(val));
      this.deleteCode = this.currentRow.rolecode;
      // this.tableForm = this.currentRow;
      post(service.rolePopedomQuery, {
        bodys: {
          rolecode: this.deleteCode
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          this.tableForm = res.data.bodys[0];
        }
      });
      // 当前角色已拥有菜单组
      this.currentPage1 = 1;
      post(service.menuGrpQuery, {
        bodys: {
          rolecode: this.deleteCode
        }
      }).then(res => {
        if (res.data.headers.code === "200" && res.data.headers.success) {
          this.tableData1 = res.data.bodys.rows;
        }
      });
      this.currentPage2 = 1;
      // 当前角色未拥有菜单组
      post(service.menuNoGrpQuery, {
        bodys: {
          rolecode: this.deleteCode,
          menugrpname: this.menugrpname
        }
      }).then(res => {
        if (res.data.headers.code === "200" && res.data.headers.success) {
          this.tableData2 = res.data.bodys.rows;
        }
      });
    },
    find() {
      // 当前角色未拥有菜单组
      post(service.menuNoGrpQuery, {
        bodys: {
          rolecode: this.currentRow.rolecode ? this.currentRow.rolecode : "",
          menugrpname: this.menugrpname
        }
      }).then(res => {
        if (res.data.headers.code === "200" && res.data.headers.success) {
          this.tableData2 = res.data.bodys.rows;
        }
      });
    },
    // 未拥有
    table({ row, rowIndex }) {
      row.index = rowIndex;
    },
    addMenu(row, event, column) {
      var index = row.index;
      this.addRow = row;
      this.index1 = row.index;
    },
    addOne() {
      if (this.addRow) {
        this.tableData1.push(this.addRow);
        this.tableData2.splice(this.index1, 1);
        this.$refs.singleTable.setCurrentRow();
        this.addRow = null;
        this.index1 = null;
      } else {
        this.$message.error("请先选择！");
      }
    },
    // 已拥有
    select({ row, rowIndex }) {
      row.index = rowIndex;
    },
    deleteMenu(row, event, column) {
      var index = row.index;
      this.deleteRow = row;
      this.indexSelect = row.index;
    },
    deleteOne() {
      if (this.deleteRow) {
        this.tableData1.splice(this.indexSelect, 1);
        this.tableData2.push(this.deleteRow);
        this.$refs.singleTable2.setCurrentRow();
        this.deleteRow = null;
        this.indexSelect = null;
      } else {
        this.$message.error("请先选择！");
      }
    },
    addForm(formName) {
      if (this.tableForm.declunmedicalmin && this.tableForm.declunmedicalmax) {
        if (
          Number(this.tableForm.declunmedicalmin) >
          Number(this.tableForm.declunmedicalmax)
        ) {
          this.$message.error("拒赔非医疗型赔案金额区间录入错误");
          return;
        }
      }
      if (this.tableForm.commedicalmin && this.tableForm.commedicalmax) {
        if (
          Number(this.tableForm.commedicalmin) >
          Number(this.tableForm.commedicalmax)
        ) {
          this.$message.error("正常获赔医疗型赔案金额区间录入错误");
          return;
        }
      }
      if (this.tableForm.comunmedicalmin && this.tableForm.comunmedicalmax) {
        if (
          Number(this.tableForm.comunmedicalmin) >
          Number(this.tableForm.comunmedicalmax)
        ) {
          this.$message.error("正常获赔非医疗型赔案金额区间录入错误");
          return;
        }
      }
      if (this.tableForm.declmedicalmin && this.tableForm.declmedicalmax) {
        if (
          Number(this.tableForm.declmedicalmin) >
          Number(this.tableForm.declmedicalmax)
        ) {
          this.$message.error("拒赔获赔医疗型赔案金额区间录入错误");
          return;
        }
      }
      if (this.tableForm.appendmin && this.tableForm.appendmax) {
        if (
          Number(this.tableForm.appendmin) > Number(this.tableForm.appendmax)
        ) {
          this.$message.error("通融赔付赔案金额区间录入错误");
          return;
        }
      }
      if (this.tableForm.exemptmin && this.tableForm.exemptmax) {
        if (
          Number(this.tableForm.exemptmin) > Number(this.tableForm.exemptmax)
        ) {
          this.$message.error("豁免赔案金额区间录入错误");
          return;
        }
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tableForm.menuGrpInsertReqList = this.tableData1;
          post(service.rolePopedomInsert, {
            bodys: this.tableForm
          }).then(res => {
            if (res.data.header.code === "200" && res.data.header.success) {
              this.$message.success(res.data.header.message);
              // this.initList()
              this.reload();
            } else {
              this.$message.error(res.data.header.message);
            }
          });
        } else {
          return false;
        }
      });
    },

    updateForm(formName) {
      if (this.tableForm.declunmedicalmin && this.tableForm.declunmedicalmax) {
        if (
          Number(this.tableForm.declunmedicalmin) >
          Number(this.tableForm.declunmedicalmax)
        ) {
          this.$message.error("拒赔非医疗型赔案金额区间录入错误");
          return;
        }
      }
      if (this.tableForm.commedicalmin && this.tableForm.commedicalmax) {
        if (
          Number(this.tableForm.commedicalmin) >
          Number(this.tableForm.commedicalmax)
        ) {
          this.$message.error("正常获赔医疗型赔案金额区间录入错误");
          return;
        }
      }
      if (this.tableForm.comunmedicalmin && this.tableForm.comunmedicalmax) {
        if (
          Number(this.tableForm.comunmedicalmin) >
          Number(this.tableForm.comunmedicalmax)
        ) {
          this.$message.error("正常获赔非医疗型赔案金额区间录入错误");
          return;
        }
      }
      if (this.tableForm.declmedicalmin && this.tableForm.declmedicalmax) {
        if (
          Number(this.tableForm.declmedicalmin) >
          Number(this.tableForm.declmedicalmax)
        ) {
          this.$message.error("拒赔获赔医疗型赔案金额区间录入错误");
          return;
        }
      }
      if (this.tableForm.appendmin && this.tableForm.appendmax) {
        if (
          Number(this.tableForm.appendmin) > Number(this.tableForm.appendmax)
        ) {
          this.$message.error("通融赔付赔案金额区间录入错误");
          return;
        }
      }
      if (this.tableForm.exemptmin && this.tableForm.exemptmax) {
        if (
          Number(this.tableForm.exemptmin) > Number(this.tableForm.exemptmax)
        ) {
          this.$message.error("豁免赔案金额区间录入错误");
          return;
        }
      }
      this.tableForm.declunmedicalmin = "" + this.tableForm.declunmedicalmin;
      this.tableForm.declunmedicalmax = "" + this.tableForm.declunmedicalmax;
      this.tableForm.commedicalmin = "" + this.tableForm.commedicalmin;
      this.tableForm.commedicalmax = "" + this.tableForm.commedicalmax;
      this.tableForm.comunmedicalmin = "" + this.tableForm.comunmedicalmin;
      this.tableForm.comunmedicalmax = "" + this.tableForm.comunmedicalmax;
      this.tableForm.declmedicalmin = "" + this.tableForm.declmedicalmin;
      this.tableForm.declmedicalmax = "" + this.tableForm.declmedicalmax;
      this.tableForm.appendmin = "" + this.tableForm.appendmin;
      this.tableForm.appendmax = "" + this.tableForm.appendmax;
      this.tableForm.exemptmin = "" + this.tableForm.exemptmin;
      this.tableForm.exemptmax = "" + this.tableForm.exemptmax;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tableForm.menuGrpInsertReqList = this.tableData1;
          post(service.rolePopedomUpdate, {
            bodys: this.tableForm
          }).then(res => {
            if (res.data.header.code === "200" && res.data.header.success) {
              this.$message.success(res.data.header.message);
              // this.initList();
              this.reload();
            } else {
              this.$message.error(res.data.header.message);
            }
          });
        } else {
          return false;
        }
      });
    },

    // 删除
    deleteF() {
      post(service.rolePopedomDelete, {
        bodys: {
          rolecode: this.deleteCode
        }
      }).then(res => {
        if (res.data.header.code === "200" && res.data.header.success) {
          this.$message.success(res.data.header.message);
          this.reload();
        } else {
          this.$message.error(res.data.header.message);
        }
      });
    },

    //重置
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      if (!this.updata) {
        this.tableForm = JSON.parse(sessionStorage.getItem("rowA"));
      } else {
        this.$refs[formName].resetFields();
      }
    },

    currentChange: function(page) {
      this.currentPage = page;
      // this.tableList();
    },
    indexMethod(index) {
      return index + 1 + (this.currentPage - 1) * 10;
    },
    currentChange1: function(page) {
      this.currentPage1 = page;
      // this.tableList();
    },
    indexMethod1(index) {
      return index + 1 + (this.currentPage1 - 1) * 10;
    },
    currentChange2: function(page) {
      this.currentPage2 = page;
      // this.tableList();
    },
    indexMethod2(index) {
      return index + 1 + (this.currentPage2 - 1) * 10;
    }
  }
};
</script>
<style lang="less" scoped>
.rolePermissions {
  margin: 10px;
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
  .work_table {
    margin-bottom: 21px;
    .find {
      padding: 20px;
      .el-input {
        width: 20% !important;
      }
    }
  }
  .block {
    background-color: #fff;
    height: 80px;
    padding-top: 20px;
    box-sizing: border-box;
  }
  .img_style {
    width: 27px;
    height: 22px;
  }
}
</style>
<style lang="less">
.rolePermissions {
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
  .special {
    .el-input {
      width: 45%;
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
.rolePermissions {
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
