<template>
	<el-row class="container">
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router v-if="!collapsed">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden | item.identity==identity">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item class="menu-list" v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item class="menu-list" v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-if="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
					        <li class="el-submenu">
						        <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
					        </li>
                        </template>
                    </li>
                </ul>
            </aside>
			<section class="content-container">
				<el-col :span="24" class="header">
					<el-col :xs="2" :sm="2" :md="2" :lg="2">
						<div class="tools" @click.prevent="collapse" style="margin-bottom: 64px;">
							<i class="fa fa-align-justify" style="vertical-align:middle; color: #353f4f;"></i>
						</div>
					</el-col>
					<el-col :xs="16" :sm="16" :md="16" :lg="16" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
					</el-col>
					<el-col :xs="3" :sm="3" :md="3" :lg="3" class="userinfo">
						<el-dropdown trigger="hover">
							<span class="el-dropdown-link userinfo-inner" 
							style="margin: auto auto auto -300px"> 欢迎你，{{sysUserName}} {{sysUserAvatar}}&emsp;</span>
							<el-dropdown-menu slot="dropdown">
								<router-link class='inlineBlock' to="/page4" style="text-decoration:none; color: black;">
									<el-dropdown-item>
										个人信息
									</el-dropdown-item>
								</router-link>
								<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
						<el-button type="success" @click="logout"  size="small">退出</el-button>
					</el-col>
				</el-col>
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
    import Screenfull from '../components/Screenfull';
    export default {
        components: {
            Screenfull
        },
        data() {
            return {
                sysName: '',
				collapsed: false,
				identity:0,
                sysUserName: '',
				sysUserAvatar: '',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                dialogVisible: false,
                maintains: [],
                total: 0,
                listLoading: false,
                sels: [],//列表选中列

                form: {
                    strTitle: '',
                    strContent: '',
                    cStartTime: '',
                    cEndTime: '',
                    uStartTime: '',
                    uEndTime: ''
                },
                listQuery: {
                    curPage: 1,
                    limit: 20,
                    pageSize: 10,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id'
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            //退出登录
            logout: function () {
                var _this = this;
                this.$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    sessionStorage.removeItem('user');
                    _this.$router.push('/login');
                }).catch(() => {

                });


            },
            //折叠导航栏
            collapse: function () {
                this.collapsed = !this.collapsed;
            },
            showMenu(i, status){
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
            }
        },
        mounted() {
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
				this.sysUserName = user.username || '';
				if(user.identity==1){
				this.identity=1;
				this.sysUserAvatar = "管理员";}
				else this.identity=2;
				if(user.identity==2){
				this.sysUserAvatar = "老师";}
				if(user.identity==3){
				this.sysUserAvatar = "同学";}
            }
        }
    }

</script>

<style scoped lang="scss">
	@import '~scss_vars';

	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		height: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: #eeeeee;
			border-left: 1px solid white;
			border-bottom: 6px solid #c0c1e1;
			.userinfo {
				text-align: right;
				padding-right: 120px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color: black;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height: 60px;
				font-size: 22px;
				padding-left: 20px;
				padding-right: 20px;
				border-color: rgba(238, 241, 146, 0.3);
				border-right-width: 0px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color: #fff;
				}
			}
			.logo-width {
				width: 350px;
			}
			.logo-collapse-width {
				width: 60px
			}
			.tools {
				padding: 0px 23px;
				width: 14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
			.screenfull {
				vertical-align: middle;
				height: 60px;
				color: red;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 0px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex: 0 0 230px;
				width: 230px;
				height: 100%;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu {
					height: 100%;
				}
				.collapsed {
					width: 60px;
					.item {
						position: relative;
					}
					.submenu {
						position: absolute;
						top: 0px;
						left: 60px;
						z-index: 99999;
						height: auto;
						display: none;
					}
				}
			}
			.menu-collapsed {
				flex: 0 0 60px;
				width: 60px;
			}
			.menu-expanded {
				flex: 0 0 230px;
				width: 230px;
			}
			.el-menu-item {
				min-width: 60px;
				&.is-active {
					background-color: #353f4f !important;
					border-right: 4px solid $color-primary;
					color: $color-primary;
				}
			}
			.menu-list {
				height: 45px;
				line-height: 45px;
				&.is-active {
					background-color: #353f4f !important;
					border-right: 4px solid $color-primary;
					color: $color-primary;
				}
			}
			.content-container {
				// background: #f1f2f7;
				flex: 1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				//padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}

	.toolbar {
		background-color: #f8f8f8 !important;
	}

	.hand {
		cursor: pointer;
	}
</style>