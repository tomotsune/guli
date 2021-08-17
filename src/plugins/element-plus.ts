import {
    ElAvatar,
    ElPagination,
    ElDialog,
    ElMenu,
    ElSubmenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElInput,
    ElCheckbox,
    ElCheckboxButton,
    ElCheckboxGroup,
    ElSwitch,
    ElSelect,
    ElOption,
    ElButton,
    ElButtonGroup,
    ElTable,
    ElTableColumn,
    ElTooltip,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElForm,
    ElFormItem,
    ElTabs,
    ElTabPane,
    ElTag,
    ElTree,
    ElAlert,
    ElIcon,
    ElRow,
    ElCol,
    ElUpload,
    ElProgress,
    ElBadge,
    ElCard,
    ElRate,
    ElSteps,
    ElStep,
    ElCarousel,
    ElCarouselItem,
    ElContainer,
    ElHeader,
    ElAside,
    ElMain,
    ElFooter,
    ElTimeline,
    ElTimelineItem,
    ElLink,
    ElDivider,
    ElImage,
    ElLoading,
    ElMessageBox,
    ElMessage,
    ElNotification
} from 'element-plus';

export default (app) => {
    const components = [
        ElAvatar,
        ElPagination,
        ElDialog,
        ElMenu,
        ElSubmenu,
        ElMenuItem,
        ElMenuItemGroup,
        ElInput,
        ElCheckbox,
        ElCheckboxButton,
        ElCheckboxGroup,
        ElSwitch,
        ElSelect,
        ElOption,
        ElButton,
        ElButtonGroup,
        ElTable,
        ElTableColumn,
        ElTooltip,
        ElBreadcrumb,
        ElBreadcrumbItem,
        ElForm,
        ElFormItem,
        ElTabs,
        ElTabPane,
        ElTag,
        ElTree,
        ElAlert,
        ElIcon,
        ElRow,
        ElCol,
        ElUpload,
        ElProgress,
        ElBadge,
        ElCard,
        ElRate,
        ElSteps,
        ElStep,
        ElCarousel,
        ElCarouselItem,
        ElContainer,
        ElHeader,
        ElAside,
        ElMain,
        ElFooter,
        ElTimeline,
        ElTimelineItem,
        ElLink,
        ElDivider,
        ElImage,
        ElLoading,
        ElMessageBox,
        ElMessage,
        ElNotification
    ]

    const plugins = [
        ElLoading,
        ElMessage,
        ElMessageBox,
        ElNotification,
    ]

    components.forEach(component => {
        app.component(component.name, component)
    })

    plugins.forEach(plugin => {
        app.use(plugin)
    })
}