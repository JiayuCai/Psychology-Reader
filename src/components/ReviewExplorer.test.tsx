import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { ReviewExplorer } from './ReviewExplorer'
import type { ReviewCollection } from '@/types/review'

const collection: ReviewCollection = {
  publication: 'Annual Review of Psychology',
  sourceUrl: 'https://www.annualreviews.org/content/journals/psych/77/1',
  updatedAt: '2026-07-04',
  years: [
    {
      year: 2026,
      entries: [
        {
          id: 'intro',
          kind: 'introduction',
          title: 'Introduction',
          authors: ['Susan T. Fiske', 'Daniel L. Schacter'],
          year: 2026,
          doi: '10.1146/annurev-psych-100125-025051',
          articleUrl: 'https://example.com/intro',
          abstract:
            '这一页把 2026 年卷首 Introduction 与整卷正式综述分布合并成一个入口，先帮助建立总地图，再决定往哪条主线深入。',
          readingStatus: 'ready',
          primarySubfield: '总论 / 编辑导论',
          secondaryTags: ['年度导论'],
          subfieldRationale: '编辑导论条目。',
          deepReading: {
            l1ProblemFraming:
              '这一卷的卷首 Introduction 把基调定得很明确：AI 正在全面进入研究、教学和知识组织，但它不能替代有判断力的、人类学者主导的整合性综述。',
            l2CoreArgument:
              'Fiske 和 Schacter 的核心态度不是反 AI，而是强调：AI 擅长汇总、计数和关联，但未必能识别“一个正在成形的重要问题”。所以这卷传递出的信号是：2026 年的心理学，一边被 AI、脑科学和数字方法强烈推动，一边更需要用人的判断力重新组织学科重点。',
            l3ConceptHandles: [
              '认知核心问题在被新方法重写：代表文章包括 Space to Act, Think, and Create、Motivation as Neural Context for Adaptive Learning and Memory Formation、The Temporal Scaffolding of Sensory Organization。',
              'AI 正在逼心理学重新定义“解释人”：代表文章包括 Cognitive Modeling Using Artificial Intelligence、Social Robotics Is Not (Just) About Machines, It Is About People。',
              '社会互动重新回到中心：代表文章包括 Scenes from a Marriage、Identity Needs in Intergroup Relations、Dyadic Emotion Regulation、The Psychology of Crowd Behavior。',
            ],
            l4DisciplinaryFeedback:
              '这一卷不是散点式拼盘，而是在回答一个问题：在 AI、脑科学、新方法和现实应用同时加压的情况下，心理学接下来应该把哪些问题放在中心。',
            l5PivotalRefs: [
              'Introduction：先读，用来抓编辑如何给整卷定调。',
              'Cognitive Modeling Using Artificial Intelligence：抓住 AI 如何逼心理学重写“认知模型”。',
              'Scenes from a Marriage：快速进入社会互动与学科史主线。',
            ],
          },
        },
        {
          id: 'paper-a',
          kind: 'article',
          title: 'Motivation as Neural Context for Adaptive Learning and Memory Formation',
          authors: ['Jia-Hou Poh', 'R. Alison Adcock'],
          year: 2026,
          doi: '10.1146/annurev-psych-032525-031744',
          articleUrl: 'https://example.com/paper-a',
          abstract: 'Memory is selective and shaped by motivational states.',
          readingStatus: 'ready',
          primarySubfield: '学习、记忆与动机',
          secondaryTags: ['记忆', '动机'],
          subfieldRationale: '聚焦动机与记忆。',
          deepReading: {
            l1ProblemFraming:
              '作者要纠正把动机只当成记忆背景变量的看法，主张动机本身会塑造编码时的神经上下文，因此决定什么会被优先记住。',
            l2CoreArgument:
              '文章提出，动机不是统一提升记忆，而是通过不同神经调制系统改变记忆的类型：VTA 支持更灵活的联结记忆，LC 更偏向整合化、目标相关的记忆；因此“动机增强记忆”必须被拆成不同神经情境下的不同结果。',
            l3ConceptHandles: [
              '动机状态：不是额外加上的激励，而是决定信息如何被编码的神经情境。',
              'VTA / dopamine：更支持灵活的 associative memory，强调关系链接与可迁移性。',
              'LC / noradrenaline：更支持 unitized goal-relevant memory，强调目标相关信息的整合与稳固。',
            ],
            l4DisciplinaryFeedback:
              '这篇综述逼迫记忆研究放弃“单一路径增强”的想象，转而回答不同动机情境究竟在改变哪一种记忆结果，以及这些机制如何外推到教育和临床。',
            l5PivotalRefs: [
              'Shohamy & Adcock：奠定奖赏与记忆耦合的研究起点。',
              'Mather 等关于 arousal-biased competition 的工作：提供去甲肾上腺素路径的背景。',
              'Lisman & Grace 关于 hippocampal-VTA loop 的框架：说明为何动机能改变编码与巩固。'
            ],
          },
        },
        {
          id: 'paper-b',
          kind: 'article',
          title: 'Human Rationality',
          authors: ['Ulrike Hahn'],
          year: 2026,
          doi: '10.1146/annurev-psych-020425-020958',
          articleUrl: 'https://example.com/paper-b',
          abstract: 'A critical overview of human rationality.',
          readingStatus: 'ready',
          primarySubfield: '判断、决策与行为改变',
          secondaryTags: ['理性', '推理'],
          subfieldRationale: '聚焦理性、推理与决策。',
          deepReading: {
            l1ProblemFraming:
              '作者的问题意识不是简单回答人类到底理不理性，而是指出理性研究无法离开规范性标尺。',
            l2CoreArgument:
              '文章主张，理性研究的关键不在于给出总判决，而在于明确所采用的规范标准以及偏离为何出现。',
            l3ConceptHandles: ['规范性与描述性的不可分离。', '概率一致性。', 'bounded rationality。'],
            l4DisciplinaryFeedback: '文章要求心理学在谈偏差与非理性前先交代评判标准。',
            l5PivotalRefs: [
              'Kahneman, D. 2011. Thinking, Fast and Slow：作为启发式与偏差传统的综合入口。',
              'Tversky, A., Kahneman, D. 1974. Judgment under Uncertainty: Heuristics and Biases：提供偏差研究的经典起点。',
              'Savage, L.J. 1954. The Foundations of Statistics：提供规范性决策框架的代表性起点。',
            ],
          },
        },
      ],
      yearSummary: {
        totalEntries: 26,
        totalArticles: 25,
        subfieldDistribution: [
          {
            name: '认知 / 认知神经 / 感知 / 决策',
            count: 8,
            overview: '经典认知问题仍在中心，但越来越通过神经、计算和发展视角被重做。',
          },
          {
            name: '社会 / 社会认知 / 关系 / 群体',
            count: 8,
            overview: '这一卷明显不满足于研究孤立个体，而是在强调关系、群体、身份和社会协作。',
          },
          {
            name: '方法 / 测量 / 研究设计',
            count: 3,
            overview: '今年不只是在更新理论，也在更新“怎么研究”的工具箱。',
          },
          {
            name: '临床 / 发展 / 健康 / 干预',
            count: 3,
            overview: '心理学越来越需要处理成瘾、儿童压力、行为干预这类现实问题，而不只是停在实验室理论。',
          },
          {
            name: 'AI / 计算 / 机器人',
            count: 2,
            overview: 'AI 不只是新工具，而是在逼心理学重新回答什么叫认知模型、社会能力和人与机器的边界。',
          },
          {
            name: '人格 / 个体差异 / 基因组',
            count: 1,
            overview: '个体差异与人格向度仍保留一条稳定入口，为整卷提供差异化解释框架。',
          },
        ],
      },
    },
  ],
}

describe('ReviewExplorer', () => {
  it('shows the introduction by default and switches the detail panel on click', async () => {
    const user = userEvent.setup()
    render(<ReviewExplorer collection={collection} />)

    expect(screen.queryByText('当前范围')).not.toBeInTheDocument()
    expect(screen.queryByText(/当前先验证/)).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Introduction' })).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', {
        name: /Motivation as Neural Context for Adaptive Learning and Memory Formation/i,
      }),
    )

    expect(
      screen.getByRole('heading', {
        name: 'Motivation as Neural Context for Adaptive Learning and Memory Formation',
      }),
    ).toBeInTheDocument()
    const articleLink = screen.getByRole('link', { name: /查看原文/i })
    expect(articleLink).toHaveAttribute('href', 'https://example.com/paper-a')
    expect(articleLink).not.toHaveAttribute('target', '_blank')
  })

  it('filters the sidebar entries with the search field', async () => {
    const user = userEvent.setup()
    render(<ReviewExplorer collection={collection} />)

    await user.type(screen.getByRole('searchbox', { name: /搜索文献/i }), 'Adcock')

    expect(
      screen.getByRole('button', {
        name: /Motivation as Neural Context for Adaptive Learning and Memory Formation/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', {
        name: /^Introduction$/,
      }),
    ).not.toBeInTheDocument()
  })

  it('hides the top yearly distribution module and folds the yearly map into the introduction detail', () => {
    render(<ReviewExplorer collection={collection} />)

    expect(screen.queryByText('年度子领域分布')).not.toBeInTheDocument()
    expect(screen.getByText('年度脉络')).toBeInTheDocument()
    expect(
      screen.getByText(/AI 正在全面进入研究、教学和知识组织，但它不能替代有判断力的、人类学者主导的整合性综述/)
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'AI / 计算 / 机器人' })).toBeInTheDocument()
    expect(screen.getByText('2 篇')).toBeInTheDocument()
    expect(screen.getByText(/这一卷不是散点式拼盘，而是在回答一个问题/)).toBeInTheDocument()
  })

  it('shows a real deep reading entry without the placeholder notice', async () => {
    const user = userEvent.setup()
    render(<ReviewExplorer collection={collection} />)

    await user.click(
      screen.getByRole('button', {
        name: /Motivation as Neural Context for Adaptive Learning and Memory Formation/i,
      }),
    )

    expect(screen.queryByText(/这是占位版精读内容/)).not.toBeInTheDocument()
    expect(
      screen.getByText(/作者要纠正把动机只当成记忆背景变量的看法/)
    ).toBeInTheDocument()
    expect(screen.getByText(/VTA \/ dopamine/)).toBeInTheDocument()
    expect(screen.queryByText('Ready')).not.toBeInTheDocument()
    expect(screen.queryByText('Demo Placeholder')).not.toBeInTheDocument()
  })
})
